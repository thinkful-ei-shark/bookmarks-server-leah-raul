const express = require('express');
const logger = require('./logger');
const bookmarks = require('./bookmarksData.json');
const { v4: uuid } = require('uuid');
const { PORT } = require('./config');

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.status(200).json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    console.log('inside of post');
    const { title, rating, desc, url } = req.body;
    console.log(title, rating, desc, url);

    if (!title) {
      logger.error('Title is required');
      return res.status(400).send('Title is required');
    }
    if (!rating) {
      logger.error('rating is required');
      return res.status(400).send('rating is required');
    }
    if (!desc) {
      logger.error('desc is required');
      return res.status(400).send('desc is required');
    }
    if (!url) {
      logger.error('url is required');
      return res.status(400).send('url is required');
    }

    const newBookmark = { id: uuid(), title, rating, url, desc };

    bookmarks.push(newBookmark);

    res
      .status(201)
      .location(`http://localhost:${PORT}/bookmarks/${newBookmark.id}`)
      .json(newBookmark);
  });

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;

    console.log('inside get id');
    const bookmark = bookmarks.find((bookmark) => bookmark.id === id);
    console.log(id);
    console.log(bookmark);

    if (!bookmark) {
      logger.error(`Bookmark with id ${id} not found`);
      return res.status(404).send('Bookmark not found');
    }

    res.json(bookmark);
  })
  .delete((req, res) => {
    const { id } = req.params;

    const bookmarkIndex = bookmarks.findIndex((bookmark) => bookmark.id === id);

    console.log(bookmarkIndex, id, bookmarks[3]);

    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found`);
      return res.status(404).send('Bookmark not found');
    }

    bookmarks.splice(bookmarkIndex, 1);

    logger.info(`Bookmark with id: ${id} has been deleted`);
    res.status(204).end();
  });

module.exports = bookmarksRouter;
