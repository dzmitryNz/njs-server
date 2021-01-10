import { Router } from 'express';
const indexRouter = Router();

/* GET users listing. */
indexRouter.get('/', function(req, res, next) {
  res.json(["INDEX /"]);
});

export default indexRouter;
