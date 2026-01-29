import { MongoClient, ObjectId } from "mongodb";
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
  skip: number = 0,
  limit: number = 0,
  order: string,
  year: number,
  month: number,
  startGoal: number,
  endGoal: number,
  title: string
) => {
  const collection = await connectDatabase();
  const sort = order === "asc" ? 1 : -1;

  const filter: any = {
    user,
  };

  if (startGoal || endGoal) {
    filter.goal = {};
    if (startGoal) filter.goal.$gte = parseFloat(startGoal);
    if (endGoal) filter.goal.$lte = parseFloat(endGoal);
  }

  if (year) {
    filter.year = parseInt(year);
  }
  if (month) {
    filter.month = parseInt(month);
  }

  if (title) {
    filter.title = {
      $regex: title, // contém
      $options: "i", // case-insensitive (opcional)
    };
  }

  try {
    const result = await collection
      .find(filter)
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

// -------------------------------------------------------- INSERT / CREATE

export const insertGoal = async (value: GoalModel) => {
  const collection = await connectDatabase();

  const response = await collection.findOneAndUpdate(
    {
      user: value.user,
      month: value.month,
      year: value.year,
    },
    { $setOnInsert: value },
    {
      upsert: true,
      returnDocument: "after",
      includeResultMetadata: true // ESSENCIAL para ver o que aconteceu
    }
  );
  
  if (response.lastErrorObject?.upserted) {
    return {
      
      message: "created",
      _id: response.lastErrorObject.upserted 
    };
  }

  
  if (response.lastErrorObject?.updatedExisting) {
    return 
  }
};



// -------------------------------------------------------- DELETE

export const deleteGoalRepository = async (
  user: string,
  _id: string
) => {
  const collection = await connectDatabase();

  try {
    const filter = {
      user: user,
      _id: new ObjectId(_id)
    };
    const result = await collection.deleteOne(filter);

    if (result.deletedCount === 1) {
      return { message: "deleted" };
    } else {
      return;
    }
  } catch (error) {
    console.error("Error ", error);
    return;
  }
};
export const deleteGoalAllRepository = async (
  user: string,
  
) => {
  const collection = await connectDatabase();

  try {
    const filter = {
      user: user
      
    };
    const result = await collection.deleteMany(filter);

    if (result.deletedCount >= 1) {
      return { message: "deleted" };
    } else {
      return;
    }
  } catch (error) {
    console.error("Error ", error);
    return;
  }
};

// -------------------------------------------------------- UPDATE

export const updateGoalRepository = async (
  user: string,
  year: number,
  month: number,
  bodyValue: GoalModel,
  _id: string
) => {
  const collection = await connectDatabase();
  const targetId = new ObjectId(_id);

  try {
    
    const conflict = await collection.findOne({
      user: user,
      month: bodyValue.month,
      year: bodyValue.year,
      _id: { $ne: targetId } // "Not Equal" ao ID 
    });

    if (conflict) {
      return { message: "conflict"};
    }

    
    const filter = { _id: targetId, user: user };
    const result = await collection.replaceOne(filter, bodyValue);

    if (result.modifiedCount === 1) {
      return { message: "updated" };
    }
    
    return ;

  } catch (error) {
    console.error("Error ", error);
    return { message: "error" };
  }
};
