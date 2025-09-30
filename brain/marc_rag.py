import fitz  # PyMuPDF
from langchain_experimental.text_splitter import SemanticChunker
from langchain_huggingface import HuggingFaceEmbeddings
from llama_index.llms.groq import Groq
from dotenv import load_dotenv
import faiss
import numpy as np
import pickle
import os

def extract_page_text(page):
    """
    Extracts text from a PDF page using blocks, sorts them by layout,
    and returns a clean string ready for semantic splitting.
    """
    blocks = page.get_text("blocks")
    # sort by vertical position (y0), then horizontal (x0)
    blocks = sorted(blocks, key=lambda b: (round(b[1]), round(b[0])))

    text_parts = []
    for b in blocks:
        block_type = b[6]  # 0 = text, 1 = image, etc.
        if block_type == 0:  # keep only text blocks
            txt = b[4].strip()
            if txt:
                text_parts.append(txt)

    # join with newlines so paragraphs don’t get merged
    return "\n".join(text_parts)


def chunk_pages(pages):
    all_chunks = []
    for page in pages:
        chunks = semantic_splitter.split_text(page["text"])
        for chunk in chunks:
            all_chunks.append({
                "page": page["page"],
                "chunk": chunk
            })
    return all_chunks



def retrieve_chunks(query, chunks, faiss_index, k=5):
    query_vector = np.array(embedding_model.embed_query(query)).astype("float32")
    D, I = faiss_index.search(np.array([query_vector]), k)
    retrieved = [chunks[i] for i in I[0]]
    return retrieved


def embed_and_cache_chunks(chunks, embed_cache_path="chunks_cache.pkl", faiss_path="faiss.index"):
    if os.path.exists(embed_cache_path) and os.path.exists(faiss_path):
        print("Loading cached embeddings and FAISS index...")
        with open(embed_cache_path, "rb") as f:
            chunks = pickle.load(f)
        faiss_index = faiss.read_index(faiss_path)
        return chunks, faiss_index

    print("Computing embeddings...")
    embeddings = []
    for entry in chunks:
        vector = embedding_model.embed_query(entry["chunk"])
        embeddings.append(vector)
        entry["embedding"] = vector
    embeddings_np = np.array(embeddings).astype("float32")

    # Build FAISS index
    dim = embeddings_np.shape[1]
    faiss_index = faiss.IndexFlatL2(dim)
    faiss_index.add(embeddings_np)

    # Cache both
    with open(embed_cache_path, "wb") as f:
        pickle.dump(chunks, f)
    faiss.write_index(faiss_index, faiss_path)

    return chunks, faiss_index


def build_prompt(user_query, retrieved_chunks):
    retrieved_text = "\n\n".join([f"[Page {c['page']}]: {c['chunk']}" for c in retrieved_chunks])
    prompt_template = """
SYSTEM PROMPT
--------------
You are a cautious assistant that answers questions strictly based on the provided document excerpts.
The document is about nutrition and its relationship to mental health.

RULES:
1. Only use the provided sources when answering. Do not invent or add outside knowledge.
2. Always cite the document with page or section numbers from the provided sources.
3. If the user asks something not covered in the sources, say clearly:
   "I don't have that information in the provided documents."
4. Do not give medical advice, diagnosis, or prescriptions. 
   Instead, present the information as educational and evidence-based.
5. Always include this disclaimer at the end of every answer:
   "This information is educational and not a substitute for professional medical advice. 
   If you are struggling with your mental health, please consult a qualified clinician. 
   If you are in crisis, seek emergency help immediately."
6. If the user expresses intent of self-harm or suicide, stop normal processing and respond ONLY with:
   "If you are thinking about suicide or self-harm, please call your local emergency number immediately. 
   You can also reach out to a crisis hotline in your country (for example, dial 988 in the U.S. or 116 123 in the U.K.). 
   You are not alone, and help is available right now."

-----------------
USER PROMPT
-----------------
User question:
{{ user_query }}

-----------------
CONTEXT
-----------------
The following excerpts are from the reference document:

{{ retrieved_chunks }}

-----------------
INSTRUCTIONS
-----------------
Answer the user's question strictly based on the above excerpts. 
Cite the sources with [Page X, Section Y]."""

    return prompt_template.replace("{{ user_query }}", user_query).replace("{{ retrieved_chunks }}", retrieved_text)


embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
semantic_splitter = SemanticChunker(
    embedding_model,
    breakpoint_threshold_type="gradient"
)

doc = fitz.open("Nutrition_Corpus.pdf")

all_pages = []
for page_num, page in enumerate(doc, start=1):
    page_text = extract_page_text(page)
    if page_text:
        all_pages.append({
            "page": page_num,
            "text": page_text
        })


chunks = chunk_pages(all_pages)
chunks, faiss_index = embed_and_cache_chunks(chunks)

user_query = "What foods help improve mental health?"
retrieved_chunks = retrieve_chunks(user_query, chunks, faiss_index, k=5)
final_prompt = build_prompt(user_query, retrieved_chunks)

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not set in environment variables.")

llm = Groq(
    model="llama-3.1-8b-instant", 
    api_key=GROQ_API_KEY
)

response = llm.complete(final_prompt)

print("Groq response:\n",response)