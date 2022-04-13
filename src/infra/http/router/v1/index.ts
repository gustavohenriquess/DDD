import express from 'express';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  res.send('v1');
});

// All routes go here

export { v1Router };
