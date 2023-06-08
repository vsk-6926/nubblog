import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import "./Write.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const categories = [];
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    categories.push(category);
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
      setSuccess(true);
    } catch (err) {}
  };

  return (
    <div className="write pt-7">
      {file && (
        <img
          className="ml-40 w-3/4 h-96 rounded-lg object-cover"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="writeForm relative" onSubmit={handleSubmit}>
        <div className="writeFormGroup ml-44 flex text-center">
          <label htmlFor="fileInput">
            <i class="w-9 h-9 mt-8 text-2xl cursor-pointer text-slate-600 fa-solid fa-folder-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
          <input
            type="text"
            placeholder="Title"
            className="writeInput border-none mt-3 text-2xl p-5 w-96 outline-none"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup ml-48 flex text-center mb-4 border-none text-xl p-5 w-1/3">
        <input
            type="text"
            placeholder="Category"
            className="writeInput border-none mt-3 text-2xl p-5 w-full outline-none"
            autoFocus={true}
            onChange={e => setCategory(e.target.value)}
          />
        </div>
        <div className="writeFormGroup ml-52 flex text-center">
          <textarea
            placeholder="Share your story too....."
            type="text"
            className="writeInput writeText border-none h-3/5 text-lg p-6 w-4/5 outline-none"
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="writesubmit absolute top-8 right-56 text-lg bg-emerald-400 border-none p-3 rounded-md cursor-pointer"
        >
          Publish
        </button>
        {success && (
            <span className="text-green-500 text-xl">Profile has been updated!</span>
          )}
      </form>
    </div>
  );
};

export default Write;
