import express, { Request, Response } from "express";
import {
  createGoalService,
  deleteGoalAllService,
  deleteGoalService,
  getMyGoalService,
  updateGoalService,
} from "../services/goal-service";

export const createGoal = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;

  const response = await createGoalService(bodyValue, authHeader);
  res.status(response.statusCode).json(response.body);
};

export const getMyGoal = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { skip, limit, order, year, month, startGoal, endGoal, title } = req.query;

  const response = await getMyGoalService(
    authHeader,
    skip,
    limit,
    order,
    year,
    month,
    startGoal,
    endGoal,
    title
  );
  res.status(response.statusCode).json(response.body);
};
export const updateGoal = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;
  const { id } = req.params;

  const response = await updateGoalService(
    authHeader,
    bodyValue,
    id
  );
  res.status(response.statusCode).json(response.body);
};

export const deleteGoal = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { id } = req.params;

  const response = await deleteGoalService(
    authHeader,
    id
  );
  res.status(response.statusCode).json(response.body);
};
export const deleteGoalAll = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  

  const response = await deleteGoalAllService(
    authHeader
   
  );
  res.status(response.statusCode).json(response.body);
};
