const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const config = require('./config');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'contact.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'about.html'));
});

const server = http.createServer(app);

function start(callback) {
  server.listen(config.PORT, () => {
    console.log(`Server started. Listening on port ${config.PORT}`);
    if (callback !== undefined) return callback();
  });
}

function stop() {
  server.close(() => {
    console.log('Server closed.');
  });
}

module.exports = {
  start,
  stop
};
