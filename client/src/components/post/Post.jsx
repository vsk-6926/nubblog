import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ post }) => {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post w-96 mt-5 mr-4 mb-7 ml-4">
      {post.photo && (
        <img
          className="postImg w-full h-60 rounded-xl object-cover"
          src={PF + post.photo}
          alt=""
        />
      )}
      <div className="postInfo flex flex-col items-center">
        <div className="postCats text-base leading-5 mt-5">
          {post.categories.map((c) => (
            <span className="postCat mr-6">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`}>
          <span className="postTitle text-2xl font-bold mt-4">
            {post.title}
          </span>
        </Link>
        <hr />
        <span className="postDate mt-3 text-lg">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc text-l leading-7 mt-3 text-center overflow-hidden text-ellipsis">
        {post.desc}
      </p>
    </div>
  );
};

export default Post;
