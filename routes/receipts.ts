import { Router } from 'express';
import { v4 as uuid } from 'uuid';
// import * as storage from '../storage/fs-ingredients';
import * as storage from '../storage/mongo-rec';
const receiptsRouter = Router();

// _id: Object;
// idMeal: string;
// strMeal: string;
// strCategory: string;
// strArea: string;
// strSource: string;
// strForPersons: number;
// strRequestsCounter: number;
// strInstructions: "",
// strMealThumb: string;
// strTags: string;
// strYoutube: string;
// strIngredient1: string;
// strMeasure1: string;

receiptsRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*" );
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

receiptsRouter.get('/', async (req, res, next) => {
  const list = await storage.listMeals();
  res.json(list);
});

receiptsRouter.get('/cat', async (req, res, next) => {
  const list = await storage.listCategories();
  res.json(list);
});

receiptsRouter.post('/array', async (req, res, next) => {
  const { body } = req;
  const list = await storage.listArray(body);
  res.json(list);
});

receiptsRouter.get('/area', async (req, res, next) => {
  const list = await storage.listAreas();
  res.json(list);
});

receiptsRouter.get('/popular', async (req, res, next) => {
  const list = await storage.listPopular();
  res.json(list);
});

receiptsRouter.get('/id/:idMeal', async (req, res, next) => {

  const item = await storage.getById(req.params["idMeal"]);
  console.log('item')

  res
  .status(item ? 200 : 404)
  .json(item ?? { statusCode: 404 });
});

receiptsRouter.get('/meal/:strMeal', async (req, res, next) => {

  const item = await storage.getByMeal(req.params["strMeal"]);

  res
  .status(item ? 200 : 404)
  .json(item ?? { statusCode: 404 });
});

receiptsRouter.get('/cat/:strCategory', async (req, res, next) => {

  const item = await storage.getByCat(req.params["strCategory"]);
 
  res
  .status(item ? 200 : 404)
  .json(item ?? { statusCode: 404 });
});

receiptsRouter.get('/area/:strArea', async (req, res, next) => {

  const item = await storage.getByArea(req.params["strArea"]);
 
  res
  .status(item ? 200 : 404)
  .json(item ?? { statusCode: 404 });
});

receiptsRouter.post('/', async (req, res, next) => {
  const id = uuid();
  const { body } = req;
  body.id = id;
  const newBody = await storage.create(body);
  res.json(newBody);
});

receiptsRouter.put('/:strMeal', async (req, res, next) => {
  const { body } = req;
  const newBody = await storage.update({
    ...body,
    strMeal: req.params.strMeal
  });
  res.json(newBody);
});

receiptsRouter.delete('/:strMeal', async (req, res, next) => {
  
  await storage.remove(req.params["strMeal"]);

  res
  .status(204)
  .json(null);
});

export default receiptsRouter;
