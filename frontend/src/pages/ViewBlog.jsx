import React from "react";
import BlogStyles from "./css/BlogStyles.module.css";
import HomeStyles from "./css/HomeStyles.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { ChakraProvider,Input,Textarea,Button ,extendTheme} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

const ViewBlog = () => {
  const  {state: blog} = useLocation();
  const goBack = () => {
    window.location.href = "/blog"
  }
  const customTheme = extendTheme({
    styles: {global: {"html, body": {bg: "black",color: "#4dcb64"}}},
    colors: {brand: {500: "#4dcb64"}}
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  // local state for editing
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSave = async () => {
  const updatedBlog = {
    query: { _id: blog._id },
    setter: { title, content } 
  };

  try {
    const res = await fetch("/api/editBlog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data.data); // "Blog updated successfully!"
      onClose();
      window.location.href = "/blog"; 
    } else {
      console.error(data.data); // "Blog Not Found" or error
    }
  } catch (err) {
    console.error("Failed to update blog:", err);
  }
};
  return (
    <ChakraProvider theme={customTheme}>
    <div>
      <section className="py-5">
        <div className="container" style={{width: "100%",display: "flex",justifyContent:'flex-end'}}>
            <button onClick={onOpen} className={`btn btn-lg ${BlogStyles.blogBtn}`}>
              <FaEdit /> 
            </button>
            <button className={`btn btn-lg ${BlogStyles.blogBtn}`}>
              <MdDelete/>
            </button>
        </div>
          <h2 style={{  textAlign: "center",color: "#4dcb64",marginBottom: "20px"}} className={`display-5 ${HomeStyles.heroHeading}`}>
            {blog ===null? goBack(): blog.title}
          </h2>
      </section>
  <section className="container py-4">
    {/* Blog Meta Info */}
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <div>
        <div className={`d-flex align-items-center ${BlogStyles.author}`}>
          <span style={{color:"white"}}>By</span>
          <div className={`${BlogStyles.photo}`}>
            <img src="person-1.jpg" alt="pfp" className="img-fluid" />
          </div>
          <div className={`${BlogStyles.name}`}>
            <h3 className="m-0 p-0">{blog.author}</h3>
          </div>
        </div>
        
        <small className="text-secondary">
          {blog?.timeToRead} min read
        </small>
      </div>
    </div>

    {/* Blog Content */}
    <article 
      className="lead text-light" 
      style={{ lineHeight: "1.8", textAlign: "justify",padding: "10px 50px" }}
    >
      {blog?.content}
      
    </article>
  </section>

    </div>
    {/* Popup */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter='blur(4px)' />
        <ModalContent bg="#111">
          <ModalHeader style={{color:'white'}}>Edit Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <div style={{display: "flex",flexDirection: 'column' ,height: '60vh'}}>
            <Input
              placeholder="Title"
              mb={3}
              value={blog.title}
              onChange={(e) => setTitle(e.target.value)}
              />
            <Textarea
              placeholder="Content"
              value={blog.content}
              style={{flex:1}}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className={BlogStyles.modalBorder}
              />
              </div>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" ml={3} onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default ViewBlog;
