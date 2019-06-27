/* eslint-disable linebreak-style */
import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /users',
  });
});

router.post('/', (req, res, next) => {
  // const user
  res.status(201).json({
    message: 'Handling POST requests to /users',
  });
});

router.get('/:userId', (req, res, next) => {
  res.status(200).json({
    message: 'user details',
  });
});

router.patch('/:userId', (req, res, next) => {
  res.status(200).json({
    message: 'You updated a user',
  });
});

router.delete('/:userId', (req, res, next) => {
  res.status(200).json({
    message: 'You deleted a user',
  });
});

export default router;
