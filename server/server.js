/* eslint-disable no-new */
/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from 'http';
import config from '../config/index';
import app from './app';
import graphqlServer from './graphql/index';

const {
  SERVER_PORT,
  TABLE_TOPIC_DB,
} = config;

const urlDb = TABLE_TOPIC_DB;

dotenv.config();

graphqlServer.applyMiddleware({ app, path: '/agent' });
const httpServer = createServer(app);
graphqlServer.installSubscriptionHandlers(httpServer);

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
        console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}${graphqlServer.graphqlPath}`);
        console.log(`🚀 Subscriptions ready at ws://localhost:${SERVER_PORT}${graphqlServer.subscriptionsPath}`);
      },
    );
  })

  .catch((error) => console.log('Your server is down', error));

export default app;
