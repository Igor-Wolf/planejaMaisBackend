import { UserModel } from "../models/user-model";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { UserAutenticationModel } from "../models/user-autentication-model";
import bcrypt from "bcrypt";
import { hashedPass } from "../utils/hashedPass";
import { stringify } from "querystring";

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
  cachedDb = database.collection(process.env.COLLECTION);
  return cachedDb;
};

// Fechar a conexão com o banco de dados
const closeDatabase = async () => {
  if (client) {
    await client.close();
  }
};

// -------------------------------------------------------- GET / READ

export const autenticateUser = async (
  value: UserAutenticationModel
): Promise<UserModel | undefined> => {
  const collection = await connectDatabase();
  const filter = { user: value.user };
  const result = await collection.findOne(filter);
  let isMatch = null;

  if (result) {
    isMatch = await bcrypt.compare(value.passwordHash, result.passwordHash);
  }

  if (result && isMatch) {
    return result;
  }

  return;
};

export const autenticateUserSimple = async (
  value: String
): Promise<UserModel | undefined> => {
  const collection = await connectDatabase();
  const filter = { user: value };
  const result = await collection.findOne(filter);

  if (result) {
    return result;
  }

  return;
};

export const veryfyEmailDatabase = async (
  email: string | undefined
): Promise<UserModel | undefined> => {
  const collection = await connectDatabase();
  const filter = { email: email };
  const result = await collection.findOne(filter);

  if (result) {
    return result;
  }

  return;
};

// -------------------------------------------------------- INSERT (Create)

export const insertUser = async (value: UserModel) => {
  //resolver problemas de usuários repedidos

  const collection = await connectDatabase();

  const filter = { user: value.user };
  const result = await collection.findOne(filter);

  const filter2 = { email: value.email };
  const result2 = await collection.findOne(filter2);

  if (!result && !result2) {
    await collection.insertOne(value);
    return { message: "created" };
  } else {
    return;
  }
};

// -------------------------------------------------------- DELETE

export const deleteUsers = async (user: string) => {
  const collection = await connectDatabase();

  try {
    const filter = { user: user };
    const result = await collection.deleteOne(filter);

    if (result.deletedCount === 1) {
      return { message: "deleted" };
    } else {
      return { message: "not found" };
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return { message: "error", error: error.message };
  }
};

// -------------------------------------------------------- UPDATE

export const findAndModifyUser = async (
  user: string,
  body: UserModel,
  validEmail: boolean
) => {
  const collection = await connectDatabase();
  let result = null;

  try {
    const filter = { user: user };
    const updatedUser = { ...body, user: user };

    const search = await collection.findOne(filter);

    if (!validEmail) {
      const filter = { email: body.email };
      const search1 = await collection.findOne(filter);

      if (!search1) {
        updatedUser.lastEmail = body.email;
        validEmail = true;
      }
    }

    if (search && updatedUser.passwordHash !== search.passwordHash) {
      // criptografando a senha
      updatedUser.passwordHash = await hashedPass(body.passwordHash);
    }

    if (validEmail) {
      result = await collection.replaceOne(filter, updatedUser);
    }

    if (result && validEmail) {
      return { message: "updated" };
    } else {
      return { message: "erro" };
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return { message: "error", error: error.message };
  }
};
export const findAndModifyPassword = async (user: string, body: string) => {
  const collection = await connectDatabase();
  let result = null;

  try {
    const filter = { user: user };
    const search = await collection.findOne(filter);
    search.passwordHash = body;

    if (search) {
      // criptografando a senha
      search.passwordHash = await hashedPass(search.passwordHash);

      result = await collection.replaceOne(filter, search);
    }

    if (result) {
      return { message: "updated" };
    } else {
      return { message: "erro" };
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return { message: "error", error: error.message };
  }
};
export const findAndModifyActivity = async (user: string) => {
  const collection = await connectDatabase();
  let result = null;

  try {
    const filter = { user: user };
    const search = await collection.findOne(filter);
    search.isActive = true;

    if (search) {
      result = await collection.replaceOne(filter, search);
    }

    if (result) {
      return { message: "updated" };
    } else {
      return { message: "erro" };
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return { message: "error", error: error.message };
  }
};
