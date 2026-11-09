const express = require('express');
const path = require('path');

const app = express();

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

app.listen(5000, () => {
  console.log('Backend running on port 5000');
});