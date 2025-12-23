import express, { Request, Response } from "express";
import {
  createGoalService,
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
  const { year, month } = req.params;

  const response = await getMyGoalService(
    authHeader,
    Number(year),
    Number(month)
  );
  res.status(response.statusCode).json(response.body);
};
export const updateGoal = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;

  const response = await updateGoalService(
    authHeader,
    bodyValue
  );
  res.status(response.statusCode).json(response.body);
};

export const deleteGoal = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { year, month } = req.params;

  const response = await deleteGoalService(
    authHeader,
    Number(year),
    Number(month)
  );
  res.status(response.statusCode).json(response.body);
};
