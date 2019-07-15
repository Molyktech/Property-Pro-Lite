/* eslint-disable linebreak-style */
import http from 'http';
import app from './app';

const port = process.env.PORT || 8000;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(process.env.NODE_ENV);
  console.log(`server is running on ${port}`);
});