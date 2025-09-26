import React from "react";
import BlogStyles from "./css/BlogStyles.module.css";
import HomeStyles from "./css/HomeStyles.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const customTheme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bg: "black",
        color: "#4dcb64",
      },
    },
  },
  colors: {
    brand: {
      500: "#4dcb64", // you can use colorScheme="brand"
    },
  },
});

  const { isOpen, onOpen, onClose } = useDisclosure();

  // local state for editing
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const handleSave = async () => {
  const updatedBlog = {
    query: { _id: blog._id }, // identify the blog
    setter: { title, content } // fields being updated
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
      // Optionally refresh or update state
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
            <button onClick={onOpen} className={`btn btn-lg ${BlogStyles.blogBtn}`}>
              Edit
            </button>
            <button className={`btn btn-lg ${BlogStyles.blogBtn}`}>
              Delete
            </button>
          </div>
        </div>
      </section>
      <section className="container">
        <div className={`mb-3 ${HomeStyles.sectionHeading}`}>
          <h2>{blog.title}</h2>
        </div>
        <p className="lead mt-3">
          {blog.content}
        </p>

        {/* <main></main> */}
      </section>
    </div>
    {/* Popup */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bg="#111">
          <ModalHeader>Edit Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Title"
              mb={3}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
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
