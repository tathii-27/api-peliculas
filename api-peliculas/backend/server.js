const express = require('express');
const cors = require('cors');
const movies = require('./movies.json');

const app = express();
const port = 3000;

app.use(cors());

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.listen(port, () => {
  console.log(\Backend corriendo en http://localhost:\\);
});
