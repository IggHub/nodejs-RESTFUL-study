import {Router} from 'express';

const router = Router();

/*
 * curl http://localhost:3000/session
*/
router.get('/', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.context.me.id
  );
  return res.send(user);
})

export default router;
