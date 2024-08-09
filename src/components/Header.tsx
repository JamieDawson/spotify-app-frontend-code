// src/components/Header.tsx
import React from "react";
import "./Header.css"; // Optional, if you have specific styles for the header

const Header: React.FC = () => {
  return (
    <div className="header">
      Spotify Battle ground is a MERN stack application where you can paste the
      URL of a Spotify album into any of the 4 inputs and save them into a
      MongoDB database. So anyone seeing this site will see your music
      recommendation.
    </div>
  );
};

export default Header;
