// src/components/Header.tsx
import React from "react";
import "./Header.css"; // Optional, if you have specific styles for the header

const Header: React.FC = () => {
  return (
    <div className="header">
      Spotify Battle ground is a MERN stack application where you can paste the
      URL of a Spotify album into any of the 4 inputs and save them into a
      MongoDB database. So anyone seeing this site will see your music
      recommendation. You can view the code by going to my{" "}
      <a
        href="https://github.com/JamieDawson/spotify-app-frontend-code"
        target="_blank"
      >
        Github account.
      </a>
    </div>
  );
};

export default Header;
