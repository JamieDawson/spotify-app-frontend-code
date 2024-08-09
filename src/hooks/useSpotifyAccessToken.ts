// src/hooks/useSpotifyAccessToken.ts

import { useState, useEffect } from "react";
import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID || "";
const CLIENT_SECRET = import.meta.env.VITE_REACT_APP_CLIENT_SECRET || "";

const useSpotifyAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
            },
          }
        );
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error("Failed to fetch access token", error);
      }
    };

    getAccessToken();
  }, []);

  return accessToken;
};

export default useSpotifyAccessToken;
