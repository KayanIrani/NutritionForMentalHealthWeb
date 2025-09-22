import React, { useState,useEffect } from "react";
import HomeStyles from "./css/HomeStyles.module.css";
import BlogStyles from "./css/BlogStyles.module.css";
// import BlogData from "./blogData.json";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [BlogData,setBlogData] = useState([])
  const loadBlogs = async () => {
    const res = await fetch('/api/printBlogs')
    const data = await res.json()
    setBlogData(data.data)
    // console.log(data)
  }
    
  const filteredBlogs = BlogData.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(()=>{
    loadBlogs()
  },[])

  const BigColumn_content = (blog) => (
    <div class={`${BlogStyles.postEntry} lg`}>
      <a href="">
        <img src="../../public/post-landscape-1.jpg" alt="" class="img-fluid" />
      </a>
      <div class={`${BlogStyles.postMeta}`}>
        <span class="date">{blog.timeToRead}</span>{" "}
        <span class="mx-1">•</span> <span>{blog.blogDate}</span>
      </div>
      <h2>
        <a href="">{blog.title}</a>
      </h2>
      <p class="mb-4 d-block fs-6">{blog.content}</p>

      <div class={`d-flex align-items-center ${BlogStyles.author}`}>
        <div class={`${BlogStyles.photo}`}>
          <img src="../../public/person-1.jpg" alt="pfp" class="img-fluid" />
        </div>
        <div class={`${BlogStyles.name}`}>
          <h3 class="m-0 p-0">{blog.author}</h3>
        </div>
      </div>
    </div>
  );
  const SmallColumn_content = (blog) => (
    <div class={`${BlogStyles.postEntry}`}>
      <a href="">
        <img src="../../public/post-landscape-1.jpg" alt="" class="img-fluid" />
      </a>
      <div class={`${BlogStyles.postMeta}`}>
        <span class="date">{blog.timeToRead}</span>{" "}
        <span class="mx-1">•</span> <span>{blog.blogDate}</span>
      </div>
      <h2>
        <a href="">{blog.title}</a>
      </h2>
      <p class="mb-4 d-block fs-6">{blog.content}</p>

      <div class={`d-flex align-items-center ${BlogStyles.author}`}>
        <div class={`${BlogStyles.photo}`}>
          <img src="../../public/person-1.jpg" alt="pfp" class="img-fluid" />
        </div>
        <div class={`${BlogStyles.name}`}>
          <h3 class="m-0 p-0">{blog.author}</h3>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <section className="text-white text-center py-5">
        <div className="container">
          <h1 className={`display-5 ${HomeStyles.heroHeading}`}>
            Nourish Your Mind, One Blog at a Time
          </h1>
          <p className="lead mb-3">
            Read our contributor's blogs, and know which foods helps improve
            your mental wellbeing.
          </p>
          <div className={BlogStyles.buttonContainer}>
            <a href="/create" target="_blank" className={`btn btn-lg ${BlogStyles.blogBtn}`}>
              Create
            </a>
            <a
              href="https://www.thelivelovelaughfoundation.org/blog"
              target="_blank"
              className={`btn btn-lg ${BlogStyles.blogBtn}`}
            >
              Explore Other Blogs
            </a>
          </div>
        </div>
      </section>
      <section className="container">
        <div className={`mb-3 ${HomeStyles.sectionHeading}`}>
          <h2>Posts</h2>
        </div>

        <div className="mb-3">
          <input
            className={BlogStyles.searchBox}
            type="search"
            value={searchTerm}
            name=""
            id=""
            placeholder="Search posts..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <main className={BlogStyles.main}>
          {filteredBlogs.length!=0 ?
          filteredBlogs.map((blog, index) =>
            index % 3 === 0
              ? BigColumn_content(blog)
              : SmallColumn_content(blog)
          ):BlogData.length!=0?<div style={{fontSize: '30px'}}>Search not found</div> :<div style={{fontSize: '30px'}}>Blogs are empty</div>}


        </main>
      </section>
    </div>
  );
};

export default Blog;
