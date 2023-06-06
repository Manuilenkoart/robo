import { parseWebsite } from "./parse";
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import checkHeadersMiddleware from "./checkHeadersMiddleware";

dotenv.config();

const host = process.env.HOST as string;
const port = Number(process.env.PORT);
const app = express();

app.use(express.json());
app.use(checkHeadersMiddleware);

app.get('/', (req, res) => {
  res.status(200).send('ok')
});

app.get('/parse-jar', async (req: Request, res: Response) => {
  try {
    const jar = await parseWebsite();

    res.status(200).json(jar)
  } catch (e) {
    console.log('parseWebsite err', e);
  }
});

app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);



