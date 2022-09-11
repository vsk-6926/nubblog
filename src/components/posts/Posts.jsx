import React from 'react'
import Post from '../post/Post';
import './Posts.css';

const Posts = ({posts}) => {
  return (
    <div className='posts flex flex-wrap m-7'>
    {posts.map((p) => (
      <Post post={p} />
    ))}
    </div>
  )
}

export default Posts