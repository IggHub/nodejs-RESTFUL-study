import {Router} from 'express';
import uuidv4 from 'uuid/v4';

const router = Router();

/*
 * curl http://localhost:3000/messages
*/
router.get('/', async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.send(messages);
})

/*
 * curl http://localhost:3000/messages/1
*/
router.get('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findById(req.params.messageId);
  return res.send(message);
}) 

/*
 * curl -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text": "Updated text"}'
*/
router.post('/', async (req, res) => {
  const message = req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id
  })

  return res.send(message);
});

/*
 * curl -X PUT -H "Content-Type:application/json" http://localhost:3000/messages/1 -d '{"text": "Content updated!"}'
*/
router.put('/:messageId', async (req, res) => {
  const messageId = req.params.messageId;
  try {
    const result = await req.context.models.Message.update({
      text: req.body.text
    },
    {
      where: {
        id: messageId
      }
    })
    return res.send('updated!')
    } catch(err) {
      console.log('error: ', err);
      return res.status(500).send(err);
    }
});

/* 
 * curl -X DELETE http://localhost:3000/messages/1
*/
router.delete('/:messageId', async (req, res) => {
  try {
    const result = await req.context.models.Message.destroy({
      where: { id: req.params.messageId },
    });

    return res.send(true);
    } catch(errr) {
      console.log('err: ', err);
      return res.status(500).send(err);
    }
});

export default router;
