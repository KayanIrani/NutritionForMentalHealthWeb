from dotenv import load_dotenv
import faiss
import numpy as np
import pickle
import os
from optimum.onnxruntime import ORTModelForFeatureExtraction
from transformers import AutoTokenizer
# from llama_index.llms.groq import Groq  # ADDED: Missing import
from groq import Groq


class MinimalEmbedding:
    """Lightweight embedding model using ONNX Runtime (no PyTorch)"""
    def __init__(self, model_name="sentence-transformers/all-MiniLM-L6-v2"):
        print("Loading tokenizer and ONNX model...")
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = ORTModelForFeatureExtraction.from_pretrained(
            model_name,
            export=True  # Auto-converts to ONNX if needed
        )
    
    def encode(self, text):
        """Encode text to embedding vector"""
        inputs = self.tokenizer(text, return_tensors="np", padding=True, truncation=True)
        outputs = self.model(**inputs)
        # Mean pooling
        embeddings = np.mean(outputs.last_hidden_state, axis=1)
        return embeddings[0]

def embed_and_cache_chunks(chunks, embed_cache_path="chunks_cache.pkl", faiss_path="faiss.index"):
    if os.path.exists(embed_cache_path) and os.path.exists(faiss_path):
        print("Loading cached embeddings and FAISS index...")
        with open(embed_cache_path, "rb") as f:
            chunks = pickle.load(f)
        faiss_index = faiss.read_index(faiss_path)
        return chunks, faiss_index
    
def retrieve_chunks(query, chunks, faiss_index):
    # query_vector = np.array(embedding_model.embed_query(query)).astype("float32")
    query_vector = embedding_model.encode(query).astype("float32")
    D, I = faiss_index.search(np.array([query_vector]), k=5)
    retrieved = [chunks[i] for i in I[0]]
    return retrieved

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




embedding_model = MinimalEmbedding()
chunks, faiss_index = embed_and_cache_chunks([])

user_query = "What foods help improve mental health?"
    
retrieved_chunks = retrieve_chunks(user_query, chunks, faiss_index)

# Build prompt
final_prompt = build_prompt(user_query, retrieved_chunks)

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not set in environment variables.")

llm = Groq(
    api_key=GROQ_API_KEY
)

response = llm.chat.completions.create(model="llama-3.1-8b-instant", messages=[{'role':"user","content":final_prompt}])

print("Groq response:\n",response.choices[0].message.content)
