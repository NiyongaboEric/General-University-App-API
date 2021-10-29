import dotenv from 'dotenv';

dotenv.config();

const config = {
  SERVER_PORT: process.env.PORT || 5500,
  GENERAL_UNIVERSITY_APP_DB: process.env.GENERAL_UNIVERSITY_APP_DB,
  GENERAL_UNIVERSITY_APP_TEST: process.env.GENERAL_UNIVERSITY_APP_TEST,
  SECRET_KEY: process.env.SECRET_KEY_ID,
  BASE_URL: process.env.BASE_URL,
};

export default config;
