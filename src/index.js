import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.listen(process.env.PORT);

app.get('/', (req, res) => {
  res.send('hello root!');
});
