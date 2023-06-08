import axios from "axios";
import React, { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import "./Settings.css";

const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err.data);
      }
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({type: "UPDATE_SUCCESS", payload: res.data})
    } catch (err) {
      dispatch({type: "UPDATE_FAILURE"});
    }
  };

  return (
    <div className="settings flex">
      <div className="settingsWrapper p-5">
        <div className="settingsTitle flex items-center justify-between">
          <span className="settingsUpTitle text-2xl mb-5 text-yellow-500">
            Update Your Account
          </span>
          <span className="settingsDelTitle text-red-600 text-lg cursor-pointer">
            Delete Account
          </span>
        </div>
        <form className="settingsForm flex flex-col" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP flex items-center mt-4 mb-4">
            <img
              className="w-24 h-24 rounded-lg object-cover"
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i class="w-7 h-7 ml-6 cursor-pointer rounded-xl bg-yellow-300 flex items-center justify-center fa-solid fa-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            ></input>
          </div>
          <label>Username</label>
          <input
            className="border-none"
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label>Email</label>
          <input
            type="text"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            type="submit"
            className="settingsSubmit w-32 h-4/5 self-center border-none rounded-md bg-yellow-500 p-5 mt-5"
          >
            Update
          </button>
          {success && (
            <span className="text-green-400">Profile has been updated!</span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
