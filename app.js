import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './src/modules/authentication/auth.route.js'
import ticketRouter from './src/modules/tickets/ticket-routes.js'
import eventRouter from './src/modules/events/events-routes.js'
import cartRouter from './src/modules/cart/cart.route.js'

dotenv.config();

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // allows cookies to be sent cross-origin
  }));

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
  });
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/ticket', ticketRouter)
  app.use('/api/v1/event', eventRouter)
  app.use('/api/v1/cart', cartRouter)



  //   app.use('/api/v1/replay', router);
  //   app.use(globalErrorHandler);

  app.post('/api/v1/translate-dream', (req, res) => {
    const { dreamDescription } = req.body;

    // TODO: implemtation of dream translation logic here

    const success = true; // Simulate success
    if (success) {
      res.json({ message: 'Dream translated successfully', translation: 'Your dream means you will have good luck!' });
    } else {
      res.status(500).json({ message: 'Failed to translate dream' });
    }

  });

  return app;
}