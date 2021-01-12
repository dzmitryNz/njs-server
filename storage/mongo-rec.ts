import { json } from 'express';
import { Collection, MongoClient } from 'mongodb';
import { RecType } from '../types/item';

const url = `mongodb+srv://clonewars:369852147@home-planner.5mot7.mongodb.net/?retryWrites=true&w=majority`;

const dbName = 'home-planer';
const collectionName = 'receipts';

const getMongoInstance = async () => {
  const client = await MongoClient.connect(url);

  return client.db(dbName);
}

const getCollection = async (): Promise<Collection> => {
  const db = await getMongoInstance();

  return db.collection(collectionName);
}

const listMeals = async () => {
  const collection = await getCollection();

  const list = collection.find({}).toArray();
  let meals = [];
  (await list).forEach((el) => {
    meals.push({"strMeal": el.strMeal, "strCategory": el.strCategory, "idMeal": el.idMeal})
  })

  return meals;
};

const listCategories = async () => {
  const collection = await getCollection();
  const list = collection.find({}).toArray();
  let mapCategories = new Map();

  (await list).forEach((el) => {
  const cat = el.strCategory;
    if (mapCategories.get(cat)) mapCategories.set(cat, mapCategories.get(cat) + 1);
        else {mapCategories.set(cat,1)}
  });
  
  return Array.from(mapCategories);
};

const listAreas = async () => {
  const collection = await getCollection();
  const list = collection.find({}).toArray();
  let mapAreas = new Map();

  (await list).forEach((el) => {
    const area = el.strArea;
    if (mapAreas.get(area)) mapAreas.set(area, mapAreas.get(area) + 1);
        else {mapAreas.set(area,1)}
  });
  
  return Array.from(mapAreas);
};

const getById = async (idMeal: string) => {
  const collection = await getCollection();

  return await collection.findOne({ idMeal });
};

const getByMeal = async (strMeal: string) => {
  const collection = await getCollection();

  return await collection.find({ strMeal }).toArray();
};

const getByCat = async (strCategory: string) => {
  const collection = await getCollection();

  return await collection.find({ strCategory }).toArray();
};

const getByArea = async (strArea: string) => {
  const collection = await getCollection();

  return await collection.find({ strArea }).toArray();
};

const create = async (item: RecType) => {
  const collection = await getCollection();

  const response = await  collection.insertOne(item);

  return response.ops[0];
};

const update = async (item: RecType) => {
  const collection = await getCollection();

  const strMeal = item.strMeal;

  const response = await collection.replaceOne({ strMeal }, item);

  return response.ops[0];
};

const remove = async (id: string) => {
  const collection = await getCollection();

  return collection.deleteOne({ id });
};

export {
  listMeals,
  listCategories,
  listAreas,
  getById,
  getByMeal,
  getByCat,
  getByArea,
  create,
  update,
  remove
}