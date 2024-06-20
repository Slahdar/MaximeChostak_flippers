import express, { Request, Response } from 'express';
import { DbConnect } from './db';
import flippers from './routes/flippers';
import marques from './routes/marques';

async function startServer() {
  const app = express();

  app.use(express.json());

  await DbConnect();

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  app.use('/api/flippers', flippers);
  app.use('/api/marques', marques);

  app.use('*', (req: Request, res: Response) => {
    res.status(404).json({ msg: '404 - Not Found' });
  });
}

startServer().catch(err => {
  console.error('Error starting server:', err);
});
