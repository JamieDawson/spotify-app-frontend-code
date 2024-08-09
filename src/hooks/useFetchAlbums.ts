// src/hooks/useFetchAlbums.ts

import { useState, useEffect } from "react";
import axios from "axios";

type Album = {
  one: string;
  two: string;
  three: string;
  four: string;
};

const useFetchAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([
    {
      one: "",
      two: "",
      three: "",
      four: "",
    },
  ]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get<Album>(
          "https://spotify-app-backend-code.vercel.app/getAlbum"
        );
        setAlbums([
          {
            one: response.data.one,
            two: response.data.two,
            three: response.data.three,
            four: response.data.four,
          },
        ]);
      } catch (err) {
        setError("Failed to fetch album data");
        console.error(err);
      }
    };

    fetchAlbums();
  }, []);

  return { albums, error };
};

export default useFetchAlbums;
