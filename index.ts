import express, { Express, Request, Response } from 'express';
import config from 'config';
import taskRouter from './src/routes/tasks.routes';

const host = config.get('server.host');
const port = config.get('server.port');

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/tasks', taskRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://${host}:${port}`);
});