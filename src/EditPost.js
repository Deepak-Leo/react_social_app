import React, { useEffect } from 'react'
import { useParams,Link } from 'react-router-dom'

const EditPost = ({posts,editBody,editTitle,setEditBody,setEditTitle,handleEdit}) => {
 
    const {id}=useParams();
    const post = posts.find(post => (post.id).toString() === id );
 
    useEffect(()=>{
          setEditBody(post.body)
          setEditTitle(post.title)
    },[post,setEditTitle,setEditBody])
    return (
    <div className='NewPost'>
      <h2>Edit Post</h2>
      <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor='postTitle'>Title:</label>
        <input
           id='postTitle'   
           type='text'
           required
           value={editTitle}
           onChange={(e)=>setEditTitle(e.target.value)}
           />
           <label htmlFor='postBody'>Post:</label>
           <textarea
              id='postBody'
              required
              value={editBody}
              onChange={(e)=>setEditBody(e.target.value)}
              />
              <button type='Submit' onClick={()=> handleEdit(post.id)}>Submit</button>
      </form>
    </div>
  )
}

export default EditPost

