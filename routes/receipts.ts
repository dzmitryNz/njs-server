import { Router } from 'express';
const receiptsRouter = Router();

/* GET users listing. */
receiptsRouter.get('/', function(req, res, next) {
  res.send('respond with a resource RECEIPTS');
});

export default receiptsRouter;
