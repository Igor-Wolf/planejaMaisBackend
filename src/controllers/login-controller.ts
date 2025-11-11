import express, { Request, Response } from "express";
import {
  autenticateAccountByEmailService,
  createUserService,
  deleteUserService,
  forgotPassService,
  getMyAcountService,
  getProtegidoService,
  newPasswordService,
  updateUserService,
  userAutenticationService,
} from "../services/login-service";

export const getProtegido = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  const response = await getProtegidoService(authHeader);
  res.status(response.statusCode).json(response.body);
};

export const autenticateAccountByEmail = async (
  req: Request,
  res: Response
) => {
  const authHeader = req.headers.authorization;

  const response = await autenticateAccountByEmailService(authHeader);
  res.status(response.statusCode).json(response.body);
};
export const forgotPass = async (req: Request, res: Response) => {
  const email = req.params.email;

  const response = await forgotPassService(email);
  res.status(response.statusCode).json(response.body);
};

export const getMyAcount = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  const response = await getMyAcountService(authHeader);
  res.status(response.statusCode).json(response.body);
};

export const createUser = async (req: Request, res: Response) => {
  const bodyValue = req.body;

  const response = await createUserService(bodyValue);
  res.status(response.statusCode).json(response.body);
};

export const userAutentication = async (req: Request, res: Response) => {
  const bodyValue = req.body;

  const response = await userAutenticationService(bodyValue);
  res.status(response.statusCode).json(response.body);
};

export const updateUser = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;
  const user = req.params.user;

  const response = await updateUserService(user, bodyValue, authHeader);
  res.status(response.statusCode).json(response.body);
};
export const newPassword = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;

  const response = await newPasswordService(bodyValue, authHeader);
  res.status(response.statusCode).json(response.body);
};

export const deleteUser = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  const response = await deleteUserService(authHeader);
  res.status(response.statusCode).json(response.body);
};
