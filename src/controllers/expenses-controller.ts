import express, { Request, Response } from "express";
import {
  createExpenseService,
  deleteExpenseService,
  getExpenseByCategoryService,
  getExpenseByDateService,
  getExpenseByDescriptionService,
  getExpenseByIdService,
  updateExpenseService,
} from "../services/expenses-service";

export const createExpense = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;

  const response = await createExpenseService(bodyValue, authHeader);
  res.status(response.statusCode).json(response.body);
};

export const getExpenseById = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { id } = req.params;

  const response = await getExpenseByIdService(authHeader, id);
  res.status(response.statusCode).json(response.body);
};
export const getExpenseByDescription = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { description } = req.params;

  const response = await getExpenseByDescriptionService(
    authHeader,
    description
  );
  res.status(response.statusCode).json(response.body);
};
export const getExpenseByCategory = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { category } = req.params;

  const response = await getExpenseByCategoryService(authHeader, category);
  res.status(response.statusCode).json(response.body);
};
export const getExpenseByDate = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { date } = req.params;
  const response = await getExpenseByDateService(authHeader, date);
  res.status(response.statusCode).json(response.body);
};

export const deleteExpense = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { id } = req.params;

  const response = await deleteExpenseService(authHeader, id);
  res.status(response.statusCode).json(response.body);
};

export const updateExpense = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;
  const { id } = req.params;

  const response = await updateExpenseService(authHeader, bodyValue, id);
  res.status(response.statusCode).json(response.body);
};
