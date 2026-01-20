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

export const getExpenseByIdRepository = async (user: string, _id: string) => {
  const collection = await connectDatabase();

  if (ObjectId.isValid(_id)) {
    const result = await collection.findOne({
      user: user,
      _id: new ObjectId(_id),
    });

    if (result) {
      return result;
    }
  }

  return;
};
export const getExpenseByDescriptionRepository = async (
  user: string,
  description: string
) => {
  const collection = await connectDatabase();

  const result = await collection
    .find({
      user: user,
      description: {
        $regex: description, // contém
        $options: "i", // case-insensitive (opcional)
      },
    })
    .toArray();

  if (result && result.length > 0) {
    return result;
  }

  return [];
};
export const getExpenseByCategoryRepository = async (
  user: string,
  category: string
) => {
  const collection = await connectDatabase();

  const result = await collection
    .find({
      user: user,
      category: {
        $regex: category, // contém
        $options: "i", // case-insensitive (opcional)
      },
    })
    .toArray();

  if (result && result.length > 0) {
    return result;
  }

  return [];
};
export const getExpenseByDateRepository = async (
  user: string,
  date: string,
  skip: number = 0,
  limit: number = 0,
  order: string
) => {
  const collection = await connectDatabase();
  const sort = order === "asc" ? 1 : -1;

  const result = await collection
    .find({
      user: user,
      date: {
        $regex: `^${date}`, // contém
        $options: "i", // case-insensitive (opcional)
      },
    })
    .sort({ date: sort })
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .toArray();

  if (result && result.length > 0) {
    return result;
  }

  return [];
};
export const getExpenseAllRepository = async (
  user: string,
  skip: number = 0,
  limit: number = 0,
  order: string
) => {
  const collection = await connectDatabase();
  const sort = order === "asc" ? 1 : -1;

  try {
    const result = await collection
      .find({
        user: user,
      })
      .sort({ updatedAt: sort })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .toArray();

    if (result && result.length > 0) {
      return result;
    }

    return [];
  } catch {
    return;
  }
};
export const getExpenseByFilterRepository = async (
  user: string,
  skip: number = 0,
  limit: number = 0,
  order: string,
  startDate: string,
  endDate: string,
  category: string,
  description: string,
  startValue: number,
  endValue: number
) => {
  const collection = await connectDatabase();
  const sort = order === "asc" ? 1 : -1;

  const filter: any = {
    user,
  };

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = startDate;
    if (endDate) filter.date.$lte = endDate;
  }
  if (startValue || endValue) {
    filter.value = {};
    if (startValue) filter.value.$gte = parseFloat(startValue);
    if (endValue) filter.value.$lte = parseFloat(endValue);
  }

  if (category) {
    filter.category = {
      $regex: category, // contém
      $options: "i", // case-insensitive (opcional)
    };
  }
  if (description) {
    filter.description = {
      $regex: description, // contém
      $options: "i", // case-insensitive (opcional)
    };
  }

  try {
    const result = await collection
      .find(filter)
      .sort({ date: sort })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .toArray();

    if (result && result.length > 0) {
      return result;
    }

    return [];
  } catch {
    return;
  }
};

// -------------------------------------------------------- INSERT / CREATE

export const insertExpense = async (value: ExpensesModel) => {
  const collection = await connectDatabase();

  const result = await collection.insertOne(value);

  if (result) {
    return {
      message: "created",
      _id: result.insertedId,
    };
  }

  return;
};

// -------------------------------------------------------- UPDATE

export const updateExpenseRepository = async (
  user: string,
  bodyValue: ExpensesModel,
  id: string
) => {
  const collection = await connectDatabase();

  try {
    const filter = {
      user: user,
      _id: new ObjectId(id),
    };
    const result = await collection.replaceOne(filter, bodyValue);

    if (result.modifiedCount === 1) {
      return { message: "updated" };
    } else {
      return;
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return;
  }
};

// -------------------------------------------------------- DELETE

export const deleteExpenseRepository = async (user: string, _id: string) => {
  const collection = await connectDatabase();

  try {
    const filter = {
      user: user,
      _id: new ObjectId(_id),
    };
    const result = await collection.deleteOne(filter);

    if (result.deletedCount === 1) {
      return { message: "deleted" };
    } else {
      return;
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return;
  }
};
export const deleteExpenseAllRepository = async (user: string) => {
  const collection = await connectDatabase();

  try {
    const filter = {
      user: user,
    };
    const result = await collection.deleteMany(filter);

    if (result.deletedCount >= 1) {
      return { message: "deleted" };
    } else {
      return;
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return;
  }
};
