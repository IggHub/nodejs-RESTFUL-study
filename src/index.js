import 'dotenv/config';
import express from 'express';
import cors from 'cors';

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

const app = express();

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`app is listening at port ${process.env.PORT}`);
});

app.get('/users', (req, res) => {
  return res.send(
    `GET HTTP method on users`
  );
});
app.get('/users/:userId', (req, res) => {
  return res.send(
    `GET HTTP method on user ${req.params.userId}`
  )
});
app.post('/users', (req, res) => {
  return res.send(
    `POST HTTP method on users`
  ) 
});
app.put('/users/:userId', (req, res) => {
  return res.send(
    `PUT HTTP method on user ${req.params.userId}`
  )
});
app.delete('/users/:userId', (req, res) => {
  return res.send(
    `DELETE HTTP method on user ${req.params.userId}`
  )
});

app.get('/messages', (req, res) => {
  return res.send(
    `GET HTTP method on messages`
  );
})
app.get('/messages/:messageId', (req, res) => {
  return res.send(
    `GET HTTP method on message ${req.params.messageId}`
  )
})
app.post('messages', (req, res) => {
  return res.send(
    `POST HTTP method on messages`
  )
});
app.put('/messages/:messageId', (req, res) => {
  return res.send(
    `PUT HTTP method on message ${req.params.messageId}`
  )
});
app.delete('/messages/:messageId', (req, res) => {
  return res.send(
    `DELETE HTTP method on message ${req.params.messageId}`
  )
});
