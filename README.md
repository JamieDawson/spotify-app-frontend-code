# Spotify Sharer - MERN stack

Spotify Sharer is a MERN stack app that displays 4 Spotify players that anyone can update the albums in the video players.

[You can interact with the website by clickin this link](https://github.com/JamieDawson/spotify-app-frontend-code)

https://github.com/user-attachments/assets/0671c95b-62fe-4f34-aa17-316cf2984d7d

## How to update albums in the video players:

1. Go to any album on Spotify.
2. Click the three dots nexts to the play button.
3. Scroll down to "Share" in the dropdown menu.
4. Select "Copy album link".
5. Paste that URL into one of the 4 inputs and click the Update Album button for that input.

## Technology used:

- React
- TypeScript
- Express.js
- Node.js
- Vercel
- Axios
- react-spotify-embed

## Frontend

The front is created using React, TypeScript, [Axios](https://www.npmjs.com/package/axios) for API calls, and the [react-spotify-embed](https://www.npmjs.com/package/react-spotify-embed) NPM package to display Spotify players in React. I'm hosting the site using Vercel so users can interact with the front end.

## Backend

The backend is created using Node.js and Express.js to make the API calls to the backend. It stores the Spotify URLs in MongoDB.
