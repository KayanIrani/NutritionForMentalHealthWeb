import React from "react";
import BlogStyles from "./css/BlogStyles.module.css";
import HomeStyles from "./css/HomeStyles.module.css";
import { useState, useEffect } from "react";


const ViewBlog = ({blog}) => {
  const [BlogData, setBlogData] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const loadBlog = async () => {
    const res = await fetch(`/api/Blogs/${params.get("id")}`);
    const data = await res.json();
    setBlogData(data.data);
    console.log(data);
  };

  useEffect(() => {
    loadBlog();
  }, []);
  return (
    <div>
      <section className="text-white text-center py-5">
        <div className="container">
          <h1 className={`display-5 ${HomeStyles.heroHeading}`}>
            Review Your Content
          </h1>
          <p className="lead mb-3">
            Click the "Edit Button" to edit your content. Click the "Delete
            Button" to remove it.
          </p>
          <div className={BlogStyles.buttonContainer}>
            <a
              href=""
              target="_blank"
              className={`btn btn-lg ${BlogStyles.blogBtn}`}
            >
              Edit
            </a>
            <a
              href="/api/deleteBlog"
              target="_blank"
              className={`btn btn-lg ${BlogStyles.blogBtn}`}
            >
              Delete
            </a>
          </div>
        </div>
      </section>
      <section className="container">
        <div className={`mb-3 ${HomeStyles.sectionHeading}`}>
          <h2></h2>
        </div>
        <p className="lead mt-3">

        </p>

        {/* <main></main> */}
      </section>
    </div>
  );
};

export default ViewBlog;
