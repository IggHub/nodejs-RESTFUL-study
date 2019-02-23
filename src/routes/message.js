import {Router} from 'express';
import uuidv4 from 'uuid/v4';

const router = Router();

/*
 * curl http://localhost:3000/messages
*/
router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
})

/*
 * curl http://localhost:3000/messages/1
*/
router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId])
}) 

/*
 * curl -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text": "Updated text"}'
*/
router.post('/', (req, res) => {
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
router.put('/:messageId', (req, res) => {
  const messageId = req.params.messageId;
  if(req.context.models.messages[messageId]) {
    req.context.models.messages[messageId] = req.body
  };

  return res.send(req.context.models.messages)
});

/* 
 * curl -X DELETE http://localhost:3000/messages/1
*/
router.delete('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;
  return res.send(message)
});

export default router;
