import express, { Request, Response } from "express";
import { getAllDateValuesService, getAllValuesService } from "../services/operations-service";

export const getAllValues = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  const response = await getAllValuesService(authHeader);
  res.status(response.statusCode).json(response.body);
};

export const getAllDateValues = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { date } = req.params;
  const response = await getAllDateValuesService(authHeader, date);
  res.status(response.statusCode).json(response.body);
};
