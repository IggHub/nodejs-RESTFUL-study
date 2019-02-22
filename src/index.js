import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import models from './models';

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

/*
 * curl http://localhost:3000/session
*/
app.get('/session', (req, res) => {
  res.send(req.context.models.users[req.context.me.id])
})

app.get('/users', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});
app.get('/users/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId])
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
/*
 * curl http://localhost:3000/messages
*/
app.get('/messages', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
})
/*
 * curl http://localhost:3000/messages/1
*/
app.get('/messages/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId])
}) 
/*
 * curl -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text": "Updated text"}'
*/
app.post('/messages', (req, res) => {
  const id = uuidv4();
  console.log('req body:', req.body);
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});
/*
 * curl -X PUT -H "Content-Type:application/json" http://localhost:3000/messages/1 -d '{"id": 1, "text": "Content updated!", "userId": 1}'
*/
app.put('/messages/:messageId', (req, res) => {
  const messageId = req.params.messageId;
  if(req.context.models.messages[messageId]) {
    req.context.models.messages[messageId] = req.body
  };

  return res.send(req.context.models.messages)
});
/* 
 * curl -X DELETE http://localhost:3000/messages/1
*/
app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;
  return res.send(message)
});

