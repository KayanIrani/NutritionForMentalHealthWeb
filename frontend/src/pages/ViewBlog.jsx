import React from "react";
import BlogStyles from "./css/BlogStyles.module.css";
import HomeStyles from "./css/HomeStyles.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { ChakraProvider,Input,Text,Textarea,Button,extendTheme} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,

} from '@chakra-ui/react'

const ViewBlog = () => {
  const  {state: blog} = useLocation();
  const toast = useToast();
  const goBack = () => {
    window.location.href = "/blog"
  }
  const customTheme = extendTheme({
    styles: {global: {"html, body": {bg: "black",color: "#4dcb64"}}},
    colors: {brand: {500: "#4dcb64"}}
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [timeToRead,setTimeToRead] = useState("");

  const handleSave = async () => {
    const updatedBlog = {
      _id: blog._id,
      setter: { "title":title, "content":content,"timeToRead":timeToRead } 
    };
    const res = await fetch("/api/editBlog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    });
    const data = await res.json();
    if (res.status === 200){
      blog.title = title;
      blog.content = content;
      blog.timeToRead = timeToRead;
      onClose();
      toast({
        title: data.data,
        isClosable: true,
        duration: 5000,
        variant: 'subtle',
        status: 'success',
        position: 'top-left'
      })
    }
    else{
      console.log(data.data);
      onClose();
      toast({
        title: data.data,
        isClosable: true,
        duration: 5000,
        variant: 'subtle',
        status: 'warning',
        position: 'top-left'
      })
      window.location.href = '/blog'
    }
  };
  
  const openModal = () =>{
    setTitle(blog.title);
    setContent(blog.content);
    setTimeToRead(blog.timeToRead);
    onOpen();
  };


  const handleDelete = async () =>{
    const res = await fetch('/api/deleteBlog',{
      method: "DELETE",
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({'_id':blog._id})
    });
    const data = await res.json();
    if (res.status === 200){
      onToggle();
      toast({
        title: data.data,
        isClosable: true,
        duration: 5000,
        variant: 'subtle',
        status: 'warning',
        position: 'top-left'
      })
      setTimeout(()=>{window.location.href = '/blog'},1000)
    }
    else{
      onToggle();
      toast({
        title: data.data,
        isClosable: true,
        duration: 5000,
        variant: 'subtle',
        status: 'warning',
        position: 'top-left'
      })
    }
  }

  const { isOpen: isOpen2, onToggle, onClose:onClose2 } = useDisclosure();
  return (
    <ChakraProvider theme={customTheme}>
    <div>
      <section className="py-5">
        <div className="container" style={{width: "100%",display: "flex",justifyContent:'flex-end'}}>
            <button onClick={()=>openModal()} className={`btn btn-lg ${BlogStyles.blogBtn}`}>
              <FaEdit /> 
            </button>
            <Popover
              isOpen = {isOpen2}
              onClose={onClose2}
              onToggle={onToggle}
            >
              <PopoverTrigger>
                <button onClick={onToggle} className={`btn btn-lg ${BlogStyles.blogBtn}`}>
                  <MdDelete/>
                </button>
              </PopoverTrigger>
              <PopoverContent bg={'#002d26'}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader color={'red.400'} textAlign={'center'}>Confirmation!</PopoverHeader>
                <PopoverBody color={'#FCC9C9'}>Are you sure you want to have this blog deleted?</PopoverBody>
                <PopoverFooter display='flex' justifyContent='flex-end'>
                  <Button onClick={onToggle} variant='outline' marginRight={'10px'} >Cancel</Button>
                  <Button onClick={handleDelete} variant='outline' color={'red.400'} >Delete</Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
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
          {/* <span style={{color:"white"}}>By</span> */}
          <div className={`${BlogStyles.photo}`}>
            <img src="person-1.jpg" alt="pfp" className="img-fluid" />
          </div>
          <div className={`${BlogStyles.name}`}>
            <h3 className="m-0 p-0">{blog.author}</h3>
          </div>
        </div>
        
        <small className="mx-2 px-2 text-secondary">
          {blog?.timeToRead} min read
        </small>
      </div>
    </div>

    {/* Blog Content */}
    <article 
      className="lead text-light" 
      style={{ lineHeight: "1.8", textAlign: "justify",padding: "10px 50px",whiteSpace:'pre-wrap' }}
    >
      {blog?.content}
      
    </article>
  </section>

    </div>
    {/* Popup */}
<Modal isOpen={isOpen} onClose={onClose} size="xl">
  <ModalOverlay backdropFilter="blur(4px)" />
  <ModalContent bg="#121212">
    <ModalHeader color={'#00D6D6'} textAlign={'center'} fontSize={'xl'}>Edit Blog</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <div
        style={{ display: "flex", flexDirection: "column", height: "60vh" }}
      >
        {/* Title */}
        <Text mb={1} fontSize="sm" color="#FFF">
          Blog Title
        </Text>
        <Input
          placeholder="Enter blog title"
          mb={3}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          focusBorderColor="green.400"
          color={'#6DD580'}
        />

        {/* Time to Read */}
        <Text mb={1} fontSize="sm" color="#FFF">
          Time to Read
        </Text>
        <Input
          placeholder="e.g. 5 min"
          mb={3}
          value={timeToRead}
          onChange={(e) => setTimeToRead(e.target.value)}
          focusBorderColor="green.400"
          color={'#6DD580'}
        />

        {/* Content */}
        <Text mb={1} fontSize="sm" color="#FFF">
          Blog Content
        </Text>
        <Textarea
          placeholder="Write your blog content here..."
          value={content}
          style={{ flex: 1 }}
          onChange={(e) => setContent(e.target.value)}
          focusBorderColor="green.400"
          color={'#6DD580'}
        />
      </div>
    </ModalBody>

    <ModalFooter>
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button color='#00D6D6' variant={'solid'} ml={3} onClick={handleSave}>
        Save
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </ChakraProvider>
  );
};

export default ViewBlog;
