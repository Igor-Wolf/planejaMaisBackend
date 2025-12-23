import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { GoalModel } from "../models/goal-model";

// Carregar variáveis de ambiente
dotenv.config();

// Configuração da conexão MongoDB
const uri: string = process.env.MONGO_URI;
const client = new MongoClient(uri);
let cachedDb: any = null;

// Conectar ao banco de dados (reutilizando a conexão se já estiver aberta)
const connectDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  await client.connect();
  const database = client.db(process.env.DATABASE);
  cachedDb = database.collection(process.env.COLLECTIONGOAL);
  return cachedDb;
};

// Fechar a conexão com o banco de dados
const closeDatabase = async () => {
  if (client) {
    await client.close();
  }
};

// -------------------------------------------------------- GET / READ

export const getMyGoalRepository = async (
  user: string,
  year: number,
  month: number
) => {
  const collection = await connectDatabase();

  const result = await collection.findOne({
    user: user,
    month: month,
    year: year,
  });

  if (result) {
    return result;
  }

  return;
};

// -------------------------------------------------------- INSERT / CREATE

export const insertGoal = async (value: GoalModel) => {
  const collection = await connectDatabase();

  const result = await collection.findOneAndUpdate(
    {
      user: value.user,
      month: value.month,
      year: value.year,
    },
    { $setOnInsert: value },
    {
      upsert: true,
      returnDocument: "before", // IMPORTANTE
    }
  );

  if (result) {
    return;
  }

  return { message: "created" };
};

// -------------------------------------------------------- DELETE

export const deleteGoalRepository = async (
  user: string,
  year: number,
  month: number
) => {
  const collection = await connectDatabase();

  try {
    const filter = {
      user: user,
      year: year,
      month: month,
    };
    const result = await collection.deleteOne(filter);

    if (result.deletedCount === 1) {
      return { message: "deleted" };
    } else {
      return ;
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return ;
  }
};

// -------------------------------------------------------- UPDATE

export const updateGoalRepository = async (
  user: string,
  year: number,
  month: number,
  bodyValue: GoalModel
) => {
  const collection = await connectDatabase();

  try {
    const filter = {
      user: user,
      year: year,
      month: month,
    };
    const result = await collection.replaceOne(filter, bodyValue);

    if (result.modifiedCount === 1) {
      return { message: "updated" };
    } else {
      return ;
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return ;
  }
};