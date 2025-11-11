import { response } from "express";
import {
  badRequest,
  conflict,
  noContent,
  ok,
  unauthorized,
} from "../utils/http-helper";
import { UserModel } from "../models/user-model";
import {
  autenticateUser,
  autenticateUserSimple,
  deleteUsers,
  findAndModifyActivity,
  findAndModifyPassword,
  findAndModifyUser,
  insertUser,
  veryfyEmailDatabase,
} from "../repositories/login-repository";
import { UserAutenticationModel } from "../models/user-autentication-model";

import jwt from "jsonwebtoken"; /// gerar token
import dotenv from "dotenv";
import { auth } from "../utils/auth";
import { hashedPass } from "../utils/hashedPass";
import { sendEmail } from "../utils/forgotPassSender";
import { NewPasswordModel } from "../models/new-Password-model";
import { sendEmail2 } from "../utils/autenticateAccountSender";

export const getProtegidoService = async (bodyValue: string | undefined) => {
  let response = null;
  let data = null;

  data = await auth(bodyValue); /// verificação do token

  if (data) {
    response = await ok(data);
  } else {
    response = await badRequest();
  }

  return response;
};
export const autenticateAccountByEmailService = async (
  bodyValue: string | undefined
) => {
  let response = null;
  let data = null;

  data = await auth(bodyValue); /// verificação do token

  if (data) {
    const database = await findAndModifyActivity(data.user);
    response = await ok(database);
  } else {
    response = await badRequest();
  }

  return response;
};

export const forgotPassService = async (email: string | undefined) => {
  let response = null;
  const secret = process.env.SECRET_KEY;

  const verifyEmail = await veryfyEmailDatabase(email);
  //testando implementar email

  if (verifyEmail && secret) {
    const user = verifyEmail.user;
    let token = jwt.sign({ user }, secret, { expiresIn: "1h" });
    token = encodeURIComponent(token);
    const restEmail = `https://login-model-one.vercel.app/NewPassword/${token}`;

    const data = await sendEmail(
      verifyEmail.email,
      "Email teste",
      restEmail,
      verifyEmail.user
    );

    response = await ok(data);
  } else {
    response = await badRequest();
  }

  return response;
};

export const getMyAcountService = async (bodyValue: string | undefined) => {
  let response = null;
  let data = null;

  data = await auth(bodyValue); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await autenticateUserSimple(data.user);
    response = await ok(fullData);
  } else {
    response = await badRequest();
  }

  return response;
};

export const createUserService = async (bodyValue: UserModel) => {
  // criptografando a senha
  bodyValue.passwordHash = await hashedPass(bodyValue.passwordHash);

  const data = await insertUser(bodyValue);
  let response = null;

  if (data) {
    response = await ok(data);
  } else {
    response = await conflict();
  }

  return response;
};

export const userAutenticationService = async (
  bodyValue: UserAutenticationModel
) => {
  const data = await autenticateUser(bodyValue);
  const secret = process.env.SECRET_KEY;
  let response = null;

  let user = bodyValue.user;

  if (data && secret && data.isActive === true) {
    if (!bodyValue.remember) {
      //gerar o token para futuros gets
      const token = jwt.sign({ user }, secret, { expiresIn: "1h" });
      response = await ok(token);
    } else {
      //gerar o token para futuros gets
      const token = jwt.sign({ user }, secret);
      response = await ok(token);
    }
  } else if (data && secret && data.isActive === false) {
    let token = jwt.sign({ user }, secret, { expiresIn: "1h" });
    token = encodeURIComponent(token);
    const restEmail = `https://login-model-one.vercel.app/AutenticateAccount/${token}`;

    const mail = await sendEmail2(data.email, "Email teste", restEmail, user);

    response = await conflict();
  } else {
    response = await unauthorized();
  }

  return response;
};

export const updateUserService = async (
  user: string,
  bodyValue: UserModel,
  authHeader: string | undefined
) => {
  const validEmail = bodyValue.email === bodyValue.lastEmail ? true : false;

  const decoded = await auth(authHeader);
    let response = null;
    

  if (decoded) {
    const data = await findAndModifyUser(decoded.user, bodyValue, validEmail);

    if (data.message === "updated") {
      response = await ok(data);
    } else if (data.message === "erro") {
      response = await conflict();
    } else {
      response = await badRequest();
    }
  } else {
    response = await badRequest();
  }

  return response;
};
export const newPasswordService = async (
  bodyValue: NewPasswordModel,
  authHeader: string | undefined
) => {
  const decoded = await auth(authHeader);
  let response = null;

  if (decoded) {
    const data = await findAndModifyPassword(
      decoded.user,
      bodyValue.passwordHash
    );

    response = await ok(data);
  } else {
    response = await badRequest();
  }

  return response;
};

export const deleteUserService = async (
  
  authHeader: string | undefined
) => {
  let data: any = null;
  const validation = await auth(authHeader); /// verificação do token
  if (validation && typeof validation !== "string") {
    data = await deleteUsers(validation.user);
  }
  let response = null;

  if (data) {
    response = await ok(data);
  } else {
    response = await badRequest();
  }

  return response;
};
