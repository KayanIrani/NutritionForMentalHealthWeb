import react, { useState } from "react";
import HomeStyles from "./css/HomeStyles.module.css";
import CreateStyles from "./css/CreateStyles.module.css";

const Create = () => {
  const [newBlog,setNewBlog] = useState(
    {
          timeToRead : "",
          blogDate : new Date().toISOString().split("T")[0],
          title : "",
          content : "",
          author : "Dr Marac",
    }
  )
  const addBlog = async () =>{
    console.log(newBlog)
    const res = await fetch('/api/getBlogs',{
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBlog)
    })
    const data = await res.json()
    // console.log(data)
  }
  return (
    <section className="container">
      <div className={`mb-3 mt-5 ${HomeStyles.sectionHeading}`}>
        <h2>Create a Blog</h2>
      </div>

      <main>   
        <form
          action=""
          method="post"
          class={`${CreateStyles.createForm}`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="row gy-4">
            <div class="col-md-6">
              <input
                type="text"
                name="name"
                class="form-control"
                placeholder="Title"
                required=""
                onChange={(e)=>setNewBlog((blog)=>({...blog,"title":e.target.value,}))}
              />
            </div>

            <div class="col-md-6 ">
              <input
                type="text"
                class="form-control"
                name="email"
                placeholder="Time to Read"
                required=""
                onChange={(e)=>setNewBlog((blog)=>({...blog,"timeToRead":e.target.value,}))}
              />
            </div>

            {/* <div class="col-md-12">
              <input
                type="text"
                class="form-control"
                name="subject"
                placeholder="Subject"
                required=""
              />
            </div> */}

            <div class="col-md-12">
              <textarea
                class="form-control"
                name="message"
                rows="6"
                placeholder="Enter Content"
                required=""
                onChange={(e)=>setNewBlog((blog)=>({...blog,"content":e.target.value,}))}

              ></textarea>
            </div>

            <div class="col-md-12 mb-3 text-center">
              <div class={`${CreateStyles.loading}`}>Loading</div>
              <div class={`${CreateStyles.errorMessage}`}></div>
              <div class={`${CreateStyles.sentMessage}`}>
                Your message has been sent. Thank you!
              </div>

              <button type="button" onClick={()=>{addBlog()}} className={CreateStyles.submitBtn}>Post</button>
            </div>
          </div>
        </form>
      </main>
    </section>
  );
};

export default Create;
