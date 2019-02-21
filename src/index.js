import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`app is listening at port ${process.env.PORT}`);
});

app.get('/users', (req, res) => {
  res.send('GET users!');
});
app.post('/users', (req, res) => {
  res.send('POST users!');
});
app.put('/users', (req, res) => {
  res.send('PUT users!');
});
app.delete('/users', (req, res) => {
  res.send('DELETE users!');
});
