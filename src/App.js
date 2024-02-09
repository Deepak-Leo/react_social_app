import React, { useEffect } from 'react';
import Header from './Header';
import { useState } from 'react';
import Nav from './Nav';
import Home from './Home';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import NewPost from './NewPost';
import About from './About';
import Missing from './Missing';
import PostPage from './PostPage';
import api from "./api/posts"
import EditPost from './EditPost';
import { DataProvider } from './context/DataContext';
function App() {
  const [posts, setPosts] = useState([
    // {
    //   id: 1,
    //   title: "My First Post",
    //   datetime: "July 01, 2021 11:17:36 AM",
    //   body: "Made a video about Tesla Q1 results"
    // },
    // {
    //   id: 2,
    //   title: "My 2nd Post",
    //   datetime: "July 01, 2021 11:17:36 AM",
    //   body: "I attended a DeFi blockchain event"
    // },
    // {
    //   id: 3,
    //   title: "My 3rd Post",
    //   datetime: "July 01, 2021 11:17:36 AM",
    //   body: "Web3 global summit next week"
    // },
    // {
    //   id: 4,
    //   title: "My Fourth Post",
    //   datetime: "July 01, 2021 11:17:36 AM",
    //   body: "ETH will outperform BTC"
    // }
  ]);
  const Navigate=useNavigate();
  const [search, setSearch] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');


  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = 90;
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try{
          const response=await api.post('/posts',newPost)
          const allPosts = [...posts, newPost];
          // const allPosts = [...posts, response.data];
          setPosts(allPosts);
          setPostTitle('');
          setPostBody('');
          Navigate('/');
    }
    catch(err){
        console.log(`Error: ${err.message}`)
      }
  }
  
  const filterPosts = () => {
    if(!search){
    return posts;
  }
   const searchTerm=search.toLocaleLowerCase();
  return posts.filter(post=>
    post.title.toLocaleLowerCase().includes(searchTerm)||
    post.body.toLocaleLowerCase().includes(searchTerm)
    );
  }
  const filteredPosts = filterPosts();
  
  const handleDelete=async(id)=>{
    try{
      await api.delete(`/posts/${id}`)
      const postsList=posts.filter(post=>post.id!==id);
      setPosts(postsList);  
      Navigate('/');
    }
    catch(err)
      {
        console.log(`Error: ${err .message}`)
      }
  }

   useEffect(()=>{
    const fetchposts = async()=>{
      try{
        const response = await api.get('/posts');
        setPosts(response.data);
      }catch(err)
      {
        console.log(`Error: ${err.message}`)
      } 
    }
    fetchposts();
   },[])
 
   const handleEdit=async(id)=>{
    const datetime = 90;
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try{
      const response=await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post=>post.id===id?
        {... response.data}:post));
      setEditTitle('');
      setEditBody('');
       Navigate('/');
    }catch(err){
      console.log(`Error: ${err.message}`);
    }
   }

  return (
    <div className='App'>
      <DataProvider>
      <Header title="Leo Social Media"/>
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
      <Route path="/" element={
      <Home posts={filteredPosts} />}/>
      <Route path='post' >
        <Route index element={<NewPost
          handleSubmit={handleSubmit}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          />}/>

          <Route path=":id" element={<PostPage posts=
          {posts} handleDelete={handleDelete}/>}/>
      </Route>
      <Route path='/edit/:id' element={<EditPost
      posts={posts}editBody={editBody}
      handleEdit={handleEdit}
      editTitle={editTitle} setEditBody={setEditBody}
      setEditTitle={setEditTitle}  />
    }/>
        <Route path='about' element={<About/>}/>
        <Route path='*' element={<Missing/>}/>
        </Routes>
        </DataProvider>
    </div>
  )
}

export default App;
