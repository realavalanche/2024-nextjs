const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
require('./database');

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');

app.use(express.static(buildPath));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${PORT}`);
});

app.post('/status', (request, response) => {
  try {
    console.log(request.params);
    return response.status(200).send({ status: 'running' });
  } catch (err) {
    return response.status(500).send(err);
  }
});

const users = require('./api/users');
app.use('/api/users', users);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});
