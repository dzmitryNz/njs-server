import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import * as storage from '../storage/fs-ingredients';
const ingredientsRouter = Router();

/* GET users listing. */
ingredientsRouter.get('/', async (req, res, next) => {
  const list = await storage.listAll();
  res.json(list);
});

ingredientsRouter.get('/:strIngredient', async (req, res, next) => {

  const item = await storage.getById(req.params["strIngredient"]);

  res
  .status(item ? 200 : 404)
  .json(item ?? { statusCode: 404 });
});

ingredientsRouter.get('/cat/:strCategory', async (req, res, next) => {

  const item = await storage.getByCat(req.params["strCategory"]);

  res
  .status(item ? 200 : 404)
  .json(item ?? { statusCode: 404 });
});

ingredientsRouter.post('/', async (req, res, next) => {
  const id = uuid();
  const { body } = req;
  body.id = id;
  const newBody = await storage.create(body);
  res.json(newBody);
});

ingredientsRouter.put('/:id', async (req, res, next) => {
  const { body } = req;
  const newBody = await storage.update({
    ...body,
    id: req.params.id
  });
  res.json(newBody);
});

ingredientsRouter.delete('/:id', async (req, res, next) => {
  
  await storage.remove(req.params["id"]);

  res
  .status(204)
  .json(null);
});

export default ingredientsRouter;
