const express = require('express');
const bodyParser = require('body-parser');
//const playlistRouter = require('./Playlists/routes');
//const songsRouter = require('./Songs/routes');
const usersRouter = require('./Users/routes');
const tokensRouter = require('./Auth/routes');

const app = express();
const port = process.env.PORT || 4000;

app
  .use(bodyParser.json())
  .use(usersRouter)
  .use(tokensRouter)
 // .use(playlistRouter)
 // .use(songsRouter)
  .listen(port, () => console.log(`Listening on port ${port}`));