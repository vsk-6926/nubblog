import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./SinglePost.css";

const SinglePost = () => {
  const PF = "http://localhost:5000/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const handleClick = async (e) => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async (e) => {
    try {
      await axios.put("/posts/" + path, {
        username: user.username,
        title,
        desc,
      });
      // window.location.reload();
      setUpdateMode(false)
    } catch (err) {}
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  return (
    <div className="singlePost mr-60">
      <div className="singlePostWrapper flex flex-col p-5 pr-0">
        {post.photo && (
          <img
            className="singlePostImg w-full h-96 rounded-md object-cover"
            src={PF + post.photo}
            alt=""
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput text-center m-4 text-3xl text-neutral-700 focus:outline-none border-none"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        ) : (
          <h1 className="singlePostTitle text-center m-4 text-3xl text-neutral-700">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit float-right text-lg">
                <i
                  class="singlePostIcon cursor-pointer ml-3 text-teal-500 fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  class="singlePostIcon cursor-pointer ml-3 text-rose-600 fa-solid fa-trash-can"
                  onClick={handleClick}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo mb-5 flex justify-between text-lg text-blue-500">
          <span className="singlePostAuthor">
            Author:{" "}
            <Link to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostAuthor">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput text-base text-slate-600 leading-6 first-letter:text-3xl first-letter:ml-2 first-letter:font-bold focus:outline-none"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="singlePostDesc text-base text-slate-600 leading-6 first-letter:text-3xl first-letter:ml-2 first-letter:font-bold">
            {desc}
          </p>
        )}
        {updateMode ? (<button
          className="singlePostButton border-none bg-teal-500 p-3 text-gray-50 rounded-md w-28 mt-5 self-end"
          onClick={handleUpdate}
        >
          Update
        </button>) : null}
      </div>
    </div>
  );
};

export default SinglePost;
