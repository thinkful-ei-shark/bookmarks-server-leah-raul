const express = require('express');
const logger = require('./logger');
const bookmarks = require('./bookmarksData.json');

const { v4: uuid } = require('uuid');

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.status(200).json(bookmarks);
  });

module.exports = bookmarksRouter;
