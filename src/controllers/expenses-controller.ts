import express, { Request, Response } from "express";
import {
  createExpenseService,
  deleteExpenseAllService,
  deleteExpenseService,
  getExpenseAllService,
  getExpenseByCategoryService,
  getExpenseByDateService,
  getExpenseByDescriptionService,
  getExpenseByFilterService,
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
  const { skip, limit, order } = req.query;  
  const response = await getExpenseByDateService(authHeader, date, skip, limit, order);
  res.status(response.statusCode).json(response.body);
};
export const getExpenseAll = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { skip, limit, order } = req.query;

  const response = await getExpenseAllService(authHeader, skip, limit, order);
  res.status(response.statusCode).json(response.body);
};
export const getExpenseByFilter = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { skip, limit, order, startDate, endDate, category, description, startValue, endValue } = req.query;

  const response = await getExpenseByFilterService(authHeader, skip, limit, order, startDate, endDate, category, description, startValue, endValue);
  res.status(response.statusCode).json(response.body);
};

export const deleteExpense = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { id } = req.params;

  const response = await deleteExpenseService(authHeader, id);
  res.status(response.statusCode).json(response.body);
};
export const deleteExpenseAll = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  

  const response = await deleteExpenseAllService(authHeader);
  res.status(response.statusCode).json(response.body);
};

export const updateExpense = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;
  const { id } = req.params;

  const response = await updateExpenseService(authHeader, bodyValue, id);
  res.status(response.statusCode).json(response.body);
};
