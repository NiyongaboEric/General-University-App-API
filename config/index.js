import dotenv from 'dotenv';

dotenv.config();

const config = {
  SERVER_PORT: process.env.PORT || 5500,
  GENERAL_UNIVERSITY_APP_URL_DB: process.env.GENERAL_UNIVERSITY_APP_URL_DB,
  GENERAL_UNIVERSITY_APP_URL_TEST: process.env.GENERAL_UNIVERSITY_APP_URL_TEST,
  BASE_URL: process.env.BASE_URL,
  SESSION_KEY_ID: process.env.SESSION_KEY_ID,
};

export default config;
