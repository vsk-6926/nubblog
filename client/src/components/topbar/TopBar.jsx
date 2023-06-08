import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

const Topbar = () => {
  const { user, dispatch } = useContext(Context);

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if(window.scrollY >= 200){
      setColor(true);
    }
    else{
      setColor(false);
    }
  }
  window.addEventListener('scroll', changeColor);

  const PF = "http://localhost:5000/images/";

  const handleLogout = async (e) => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className={color ? "topChange bg-slate-300 mt-4 ml-9 rounded-lg" : "top mt-4 ml-9 rounded-lg bg-cyan-700"}>
      <div className="topleft">
        {user ? (
          <Link to="/settings">
            <img
              className="topImg cursor-pointer"
              src={PF + user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="listItem">
              <Link className="link" to="login">
                Login
              </Link>
            </li>
            <li className="listItem">
              <Link className="link" to="register">
                Register
              </Link>
            </li>
          </ul>
        )}

        <i class="topIcon searchIcon fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="topcenter">
        <ul className="topList">
          <li className="listItem">
            <Link to="/">Home</Link>
          </li>
          <li className="listItem">
            <Link to="">About</Link>
          </li>
          <li className="listItem">
            <Link to="write">Write</Link>
          </li>
          <li className="listItem">
            <Link to="">Contact</Link>
          </li>
          <li className="listItem" onClick={handleLogout}>
            {user && "Logout"}
          </li>
        </ul>
      </div>
      <div className="topright">
        <i class="topIcon fa-brands fa-square-facebook"></i>
        <i class="topIcon fa-brands fa-square-twitter"></i>
        <i class="topIcon fa-brands fa-square-pinterest"></i>
        <i class="topIcon fa-brands fa-square-instagram"></i>
      </div>
    </div>
  );
};

export default Topbar;
