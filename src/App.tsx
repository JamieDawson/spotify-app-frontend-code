import { useState, useEffect } from "react";
import { Spotify } from "react-spotify-embed";
import axios from "axios";
import "./App.css";
import Header from "./components/Header"; // Import the Header component
import useSpotifyAccessToken from "./hooks/useSpotifyAccessToken"; // Import the custom hook

type Album = {
  one: string;
  two: string;
  three: string;
  four: string;
};

function App() {
  const [albumOne, setAlbumOne] = useState<string>("");
  const [albumTwo, setAlbumTwo] = useState<string>("");
  const [albumThree, setAlbumThree] = useState<string>("");
  const [albumFour, setAlbumFour] = useState<string>("");

  const [allAlbums, setAllAlbums] = useState<Album[]>([
    {
      one: "",
      two: "",
      three: "",
      four: "",
    },
  ]);

  // State to track validity for each album
  const [validUrls, setValidUrls] = useState<{
    [key in keyof Album]: boolean | null;
  }>({
    one: null,
    two: null,
    three: null,
    four: null,
  });

  const accessToken = useSpotifyAccessToken(); // Use the custom hook

  //Runs once when app loads. Gets albums that are currently in backend.
  useEffect(() => {
    console.log("USEEFFECT GET ALBUMS CALL");
    const fetchAlbum = async () => {
      try {
        const response = await axios.get<Album>(
          "https://spotify-app-backend-code.vercel.app/getAlbum"
        );
        console.log(response.data);
        let test = [
          {
            one: response.data.one,
            two: response.data.two,
            three: response.data.three,
            four: response.data.four,
          },
        ];
        setAllAlbums(test);
      } catch (err) {
        console.log("Failed to fetch album data");
      }
    };

    fetchAlbum();
  }, []);

  //Function to send data to the backend.
  const updateAlbumOnBackend = async (updates: Partial<Album>) => {
    try {
      const response = await fetch(
        "https://spotify-app-backend-code.vercel.app/albumsUpdate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedAlbum = await response.json();
      return updatedAlbum;
    } catch (error) {
      console.error("Failed to update album:", error);
      throw error;
    }
  };

  const updateAlbums = async (
    event: React.FormEvent,
    index: number,
    albumKey: keyof Album,
    typedAlbumFromInput: string
  ) => {
    event.preventDefault();

    typedAlbumFromInput = typedAlbumFromInput.split("?")[0];

    if (accessToken) {
      const isValid = await checkSpotifyUrl(typedAlbumFromInput);

      if (isValid) {
        const newObject = [...allAlbums];
        newObject[index] = {
          ...newObject[index],
          [albumKey]: typedAlbumFromInput,
        };
        setAllAlbums(newObject);
        setValidUrls((prevValidUrls) => ({
          ...prevValidUrls,
          [albumKey]: true,
        }));

        // Prepare the update payload
        const updates: Partial<Album> = {
          [albumKey]: typedAlbumFromInput,
        };

        // Send the update to the backend
        try {
          await updateAlbumOnBackend(updates);
        } catch (error) {
          console.error("Error updating album on backend:", error);
        }
      } else {
        setValidUrls((prevValidUrls) => ({
          ...prevValidUrls,
          [albumKey]: false,
        }));
      }
    } else {
      console.error("Access token is not available.");
    }
  };

  const checkSpotifyUrl = async (url: string): Promise<boolean> => {
    try {
      const albumId = url.split("/album/")[1].split("?")[0];

      const response = await axios.get(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="album">
          {allAlbums[0].one && <Spotify link={allAlbums[0].one} />}
          <form onSubmit={(e) => updateAlbums(e, 0, "one", albumOne)}>
            <input
              className="input-field"
              type="text"
              placeholder="album 1"
              onChange={(e) => setAlbumOne(e.target.value)}
              value={albumOne}
            />
            <button type="submit" className="submit-button">
              Update album 1
            </button>
          </form>
          {validUrls.one === false && (
            <p className="error-message">Invalid Spotify URL for Album 1</p>
          )}
        </div>
        <div className="album">
          {allAlbums[0].two && <Spotify link={allAlbums[0].two} />}
          <form onSubmit={(e) => updateAlbums(e, 0, "two", albumTwo)}>
            <input
              className="input-field"
              type="text"
              placeholder="album 2"
              onChange={(e) => setAlbumTwo(e.target.value)}
              value={albumTwo}
            />
            <button type="submit" className="submit-button">
              Update album 2
            </button>
          </form>
          {validUrls.two === false && (
            <p className="error-message">Invalid Spotify URL for Album 2</p>
          )}
        </div>
        <div className="album">
          {allAlbums[0].three && <Spotify link={allAlbums[0].three} />}
          <form onSubmit={(e) => updateAlbums(e, 0, "three", albumThree)}>
            <input
              className="input-field"
              type="text"
              placeholder="album 3"
              onChange={(e) => setAlbumThree(e.target.value)}
              value={albumThree}
            />
            <button type="submit" className="submit-button">
              Update album 3
            </button>
          </form>
          {validUrls.three === false && (
            <p className="error-message">Invalid Spotify URL for Album 3</p>
          )}
        </div>
        <div className="album">
          {allAlbums[0].four && <Spotify link={allAlbums[0].four} />}
          <form onSubmit={(e) => updateAlbums(e, 0, "four", albumFour)}>
            <input
              className="input-field"
              type="text"
              placeholder="album 4"
              onChange={(e) => setAlbumFour(e.target.value)}
              value={albumFour}
            />
            <button type="submit" className="submit-button">
              Update album 4
            </button>
          </form>
          {validUrls.four === false && (
            <p className="error-message">Invalid Spotify URL for Album 4</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
