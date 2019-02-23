import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import models from './models';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  }
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`app is listening at port ${process.env.PORT}`);
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
