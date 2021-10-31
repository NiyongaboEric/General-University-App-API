import express, { json, urlencoded } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import MongoStore from 'connect-mongo';

import config from '../config/index';
import routes from './routes';
import { handleErrors, homePage } from './middlewares/handlingRequest';

const app = express();

const {
  SESSION_KEY_ID,
  GENERAL_UNIVERSITY_APP_URL_DB,
} = config;

app.use(helmet());

app.get('/', homePage);

app.use(
  session(
    {
      secret: SESSION_KEY_ID,
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: GENERAL_UNIVERSITY_APP_URL_DB,
      }),
    },
  ),
);
urlencoded({ extended: false });

app.use(json());

app.use('/api/v1', routes);

app.use(handleErrors);

export default app;
