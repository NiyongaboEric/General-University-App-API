/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from 'http';

import config from '../config/index';
import app from './app';

const {
  SERVER_PORT,
  GENERAL_UNIVERSITY_APP_URL_DB,
} = config;
const urlDb = GENERAL_UNIVERSITY_APP_URL_DB;
const httpServer = createServer(app);

dotenv.config();

mongoose
  .connect(
    urlDb,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    httpServer.listen(
      SERVER_PORT,
      () => {
        console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}`);
      },
    );
  })
  .catch((error) => console.log('Your server is down', error));

export default app;
