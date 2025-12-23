import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import { ExpensesModel } from "../models/expenses.model";

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
  cachedDb = database.collection(process.env.COLLECTIONEXPENSES);
  return cachedDb;
};

// Fechar a conexão com o banco de dados
const closeDatabase = async () => {
  if (client) {
    await client.close();
  }
};

// -------------------------------------------------------- GET / READ

export const getAllValuesRepository = async (user: string) => {
  const collection = await connectDatabase();

  const result = await collection.find({
    user: user,
  }).toArray();;

  if (result) {
    return result;
  }

  return;
};


export const getAllDateValuesRepository = async (
  user: string,
  date: string
) => {
  const collection = await connectDatabase();

  const result = await collection
    .find({
      user: user,
      date: {
        $regex: date, // contém
        $options: "i", // case-insensitive (opcional)
      },
    })
    .toArray();

  if (result && result.length > 0) {
    return result;
  }

  return;
};
