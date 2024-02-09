import React from 'react'
import Post from './Post'

const Home = ({posts}) => {
  return (
    <div className='Home'> 
         {posts.length? 

        posts.map(post => (
          <Post key={post.id} post={post}/>)
        ):
         <p style={{marginTop:"2rem"}}>
          No posts to display.
          </p>
          }
    </div>
  )
}

export default Home
