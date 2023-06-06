import { parseWebsite } from "./parse";
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import checkHeadersMiddleware from "./checkHeadersMiddleware";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
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

app.listen(port, () =>
  console.log(`Server listen: ${port}`)
);



