import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import helmet from 'helmet';
import config from '../config/index';
import routes from './routes';
import { handleErrors, homePage } from './middlewares/handlingRequest';

const MongoStore = require('connect-mongo')(session);

const app = express();

const {
  SESSION_KEY_ID,
} = config;

app.use(helmet());

app.get('/', homePage);

app.use(
  session(
    {
      secret: SESSION_KEY_ID,
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    },
  ),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', routes);


app.use(handleErrors);

export default app;
