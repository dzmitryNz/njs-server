import { Collection, MongoClient } from 'mongodb';
import { ItemType } from '../types/item';
const PropertiesJson = {serverUrlLocal: "mongodb://192.168.1.66:27017/",
serverUrl: "mongodb+srv://dzmitrynz:369852147M@cluster0.5mot7.mongodb.net/"};

const url = PropertiesJson.serverUrl;

const dbName = 'home-planner';
const collectionName = 'ingredients';

const getMongoInstance = async () => {
  const client = await MongoClient.connect(url);

  return client.db(dbName);
}

const getCollection = async (): Promise<Collection> => {
  const db = await getMongoInstance();

  return db.collection(collectionName);
}

const listAll = async () => {
  const collection = await getCollection();

  return collection.find({}).toArray();
};

const listArray = async (obj: object) => {
  const collection = await getCollection();
  const el = obj["el"];
  const reg = new RegExp(obj["reg"]);
  console.log(el, reg)
  const ingredients = await collection.find({ [el]: reg }).toArray();
  console.log(el, reg, ingredients)

  return ingredients;
};

const getById = async (strIngredient: string) => {
  const collection = await getCollection();

  return await collection.findOne({ strIngredient });
};

const getByCat = async (strCategory: string) => {
  const collection = await getCollection();

  return await collection.findOne({ strCategory });
};

const create = async (item: ItemType) => {
  const collection = await getCollection();

  const response = await  collection.insertOne(item);

  return response.ops[0];
};

const update = async (item: ItemType) => {
  const collection = await getCollection();

  const id = item._id;

  const response = await collection.replaceOne({ id }, item);

  return response.ops[0];
};

const remove = async (id: string) => {
  const collection = await getCollection();

  return collection.deleteOne({ id });
};

export {
  listAll,
  listArray,
  getById,
  getByCat,
  create,
  update,
  remove
}
