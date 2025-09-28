import React, { useState,useEffect } from "react";
import HomeStyles from "./css/HomeStyles.module.css";
import BlogStyles from "./css/BlogStyles.module.css";
// import BlogData from "./blogData.json";
import { Link } from "react-router-dom";


const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [BlogData,setBlogData] = useState([])
  const loadBlogs = async () => {
    const res = await fetch('/api/printBlogs')
    const data = await res.json()
    setBlogData(data.data)
    console.log(data)
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
    <div key={blog._id} className={`${BlogStyles.postEntry} lg`}>
      <a href="">
        <img src="post-landscape-1.jpg" alt="" className="img-fluid" />
      </a>
      <div className={`${BlogStyles.postMeta}`}>
        <span className="date">{blog.timeToRead}</span>{" "}
        <span className="mx-1">•</span> <span>{blog.blogDate}</span>
      </div>
      <h2>
        {/* <a href={`/view-blog/?id=${blog._id}`}>{blog.title}</a> */}
        <Link to={'/view-blog'} state={blog}>{blog.title}</Link>
      </h2>
      <p className="mb-4 d-block fs-6" style={{textAlign:'justify'}}>{blog.content}</p>

      <div className={`d-flex align-items-center ${BlogStyles.author}`}>
        <div className={`${BlogStyles.photo}`}>
          <img src="person-1.jpg" alt="pfp" className="img-fluid" />
        </div>
        <div className={`${BlogStyles.name}`}>
          <h3 className="m-0 p-0">{blog.author}</h3>
        </div>
      </div>
    </div>
  );
  const SmallColumn_content = (blog) => (
    <div key={blog._id} className={`${BlogStyles.postEntry}`}>
      <a href="">
        <img src="post-landscape-1.jpg" alt="" className="img-fluid" />
      </a>
      <div className={`${BlogStyles.postMeta}`}>
        <span className="date">{blog.timeToRead}</span>{" "}
        <span className="mx-1">•</span> <span>{blog.blogDate}</span>
      </div>
      <h2>
        {/* <a href="/view-blog">{blog.title}</a> */}
        <Link to={'/view-blog'} state={blog}>{blog.title}</Link>

      </h2>
      <p className="mb-4 d-block fs-6" style={{textAlign:'justify'}}>{blog.content}</p>

      <div className={`d-flex align-items-center ${BlogStyles.author}`}>
        <div className={`${BlogStyles.photo}`}>
          <img src="person-1.jpg" alt="pfp" className="img-fluid" />
        </div>
        <div className={`${BlogStyles.name}`}>
          <h3 className="m-0 p-0">{blog.author}</h3>
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
