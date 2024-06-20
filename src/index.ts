import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { DbConnect } from './db';
import flippersRouter from './routes/flippers';

async function startServer() {
  const app = new Hono();
  await DbConnect();

  const port = 3000;

  app.route('/api/flippers', flippersRouter);

  app.use("*", (req, res) => {
    return res.json({ msg: '404' });
  });

  await serve({
    fetch: app.fetch,
    port
  });

  console.log(`Server listening on port ${port}`);
}

startServer().catch(err => console.error(err));
