import { Router } from 'express';
const ingredientsRouter = Router();

/* GET users listing. */
ingredientsRouter.get('/', function(req, res, next) {
  res.send('respond with a resource INGREDIENTS');
});

export default ingredientsRouter;
