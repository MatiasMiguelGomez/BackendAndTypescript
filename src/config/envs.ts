import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT ? process.env.PORT : 3000,
  SECRET_CODE: process.env.SECRET_CODE ? process.env.SECRET_CODE : 'secretcode',
  MONGO_URL: process.env.MONGO_URL ? process.env.MONGO_URL : 'urlDataBase',
  JWT_SECRET_CODE: process.env.JWT_SECRET_CODE
    ? process.env.JWT_SECRET_CODE
    : 'secretCodeJWT',
};
