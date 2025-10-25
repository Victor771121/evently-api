import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

dotenv.config();

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
  });

//   app.use('/api/v1/replay', router);
//   app.use(globalErrorHandler);

  return app;
};