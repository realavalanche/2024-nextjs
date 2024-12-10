/* eslint-disable no-undef */
const express = require('express');
// const connectDB = require('./database/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const { OpenAI } = require('openai');

const app = express();
// require('./database');
// connectDB();
const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');

app.use(express.static(buildPath));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

app.post('/v1/status', (request, response) => {
  try {
    return response.status(200).send({ status: 'running' });
  } catch (err) {
    return response.status(500).send(err);
  }
});

app.post('/v1/ask', async (request, response) => {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (token == null) return res.status(401); // No token present

  try {
    const client = new OpenAI({
      apiKey: token,
    });
    const aiResponse = await client.chat.completions.create({
      messages: [{ role: 'user', content: request.body.content }],
      model: 'gpt-4o-mini',
    });
    return response.status(200).send({ data: aiResponse.choices[0] });
  } catch (err) {
    if (err.status == 403)
      return response
        .status(err.status)
        .send({ data: { message: { content: err.error.message } } });
    return response.status(500).send(err);
  }
});

// mongoose.connect('mongodb+srv://sid317:Computer@4@next-cluster.jisoo.mongodb.net/?retryWrites=true&w=majority&appName=next-cluster')
const users = require('./api/users');
app.use('/api/users', users);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});
