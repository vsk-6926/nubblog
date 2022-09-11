import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="firstTitle">Write & Share</span>
        <span className="secondTitle">Blog Nub</span>
      </div>
      <img
        className="headerImg"
        src="https://img.freepik.com/premium-photo/woman-works-office-blue-background-concept-workspace-working-computer-freelance-banner_164357-1144.jpg?w=2000"
        alt=""
      />
    </div>
  );
};

export default Header;
