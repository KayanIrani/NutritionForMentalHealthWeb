import React, { useState } from "react";
import HomeStyles from "./css/HomeStyles.module.css";
import CreateStyles from "./css/CreateStyles.module.css";
import { ChakraProvider, useToast,extendTheme } from "@chakra-ui/react";

const Create = () => {
  const toast = useToast();
  const [newBlog, setNewBlog] = useState({
    timeToRead: "",
    blogDate: new Date().toISOString().split("T")[0],
    title: "",
    content: "",
    author: "Dr Marac",
  });

  const validateForm = () => {
    if (!newBlog.title.trim()) {
      toast({
        title: "Title is required",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return false;
    }
    if (!newBlog.timeToRead.trim()) {
      toast({
        title: "Time to Read is required",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return false;
    }
    if (!newBlog.content.trim()) {
      toast({
        title: "Content cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return false;
    }
    return true;
  };

  const addBlog = async () => {
    if (!validateForm()) return;

    const res = await fetch("/api/createBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    });

    const data = await res.json();

    if (res.status === 200) {
      toast({
        title: data.data,
        isClosable: true,
        duration: 2000,
        variant: "solid",
        status: "success",
        position: "bottom",
      });
      setTimeout(() => {
        window.location.href = "/blog";
      }, 3000);
    } else {
      toast({
        title: data.data,
        isClosable: true,
        duration: 5000,
        variant: "subtle",
        status: "warning",
        position: "bottom",
      });
    }
  };
    const customTheme = extendTheme({
      styles: {global: {"html, body": {bg: "black",color: "#4dcb64"}}},
      colors: {brand: {500: "#4dcb64"}}
    });
  return (
    <ChakraProvider theme={customTheme}>
      <section className="container">
        <div className={`mb-3 mt-5 ${HomeStyles.sectionHeading}`}>
          <h2>Create a Blog</h2>
        </div>

        <main>
          <form
            action=""
            method="post"
            className={`${CreateStyles.createForm}`}
            data-aos="fade-up"
            data-aos-delay="200"
            onSubmit={(e) => e.preventDefault()} // prevent full reload
          >
            <div className="row gy-4">
              <div className="col-md-6">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={newBlog.title}
                  onChange={(e) =>
                    setNewBlog((blog) => ({ ...blog, title: e.target.value }))
                  }
                />
              </div>

              <div className="col-md-6 ">
                <input
                  type="text"
                  className="form-control"
                  name="timeToRead"
                  placeholder="Time to Read"
                  value={newBlog.timeToRead}
                  onChange={(e) =>
                    setNewBlog((blog) => ({
                      ...blog,
                      timeToRead: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-md-12">
                <textarea
                  className="form-control"
                  name="content"
                  rows="6"
                  placeholder="Enter Content"
                  value={newBlog.content}
                  onChange={(e) =>
                    setNewBlog((blog) => ({
                      ...blog,
                      content: e.target.value,
                    }))
                  }
                ></textarea>
              </div>

              <div className="col-md-12 mb-3 text-center">
                <button
                  type="button"
                  onClick={addBlog}
                  className={CreateStyles.submitBtn}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </main>
      </section>
    </ChakraProvider>
  );
};

export default Create;
