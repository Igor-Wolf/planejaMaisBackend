import { response } from "express";
import { GoalModel, validateGoal } from "../models/goal-model";
import { auth } from "../utils/auth";
import { badRequest, conflict, created, deleted, ok } from "../utils/http-helper";
import {
  deleteGoalRepository,
  getMyGoalRepository,
  insertGoal,
  updateGoalRepository,
} from "../repositories/goal-repository";

export const getMyGoalService = async (
  authHeader: string | undefined,
  year: number,
  month: number
) => {
  let response = null;
  let data = null;

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await getMyGoalRepository(data.user, year, month);

    if (fullData) {
      response = await ok(fullData);
    } else {
      response = await badRequest();
    }
  } else {
    response = await badRequest();
  }

  return response;
};

export const createGoalService = async (
  bodyValue: GoalModel,
  authHeader: string | undefined
) => {
  const isvalid = await validateGoal(bodyValue);

  if (!isvalid) {
    const response = await badRequest();
    return response;
  }

  const decoded = await auth(authHeader);
  let response = null;
  if (decoded) {
    bodyValue.user = decoded.user;
    const data = await insertGoal(bodyValue);
    if (data) {
      response = await created();
    } else {
      response = await conflict();
    }
  } else {
    response = await badRequest();
  }

  return response;
};

export const updateGoalService = async (
  authHeader: string | undefined,
  bodyValue: GoalModel
) => {
  let response = null;
  let data = null;

  const isvalid = await validateGoal(bodyValue);

  if (!isvalid) {
    const response = await badRequest();
    return response;
  }

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    bodyValue.user = data.user;
    const fullData = await updateGoalRepository(
      data.user,
      bodyValue.year,
      bodyValue.month,
      bodyValue
    );

    if (fullData) {
      response = await ok(fullData);
    } else {
      response = await badRequest();
    }
  } else {
    response = await badRequest();
  }

  return response;
};

export const deleteGoalService = async (
  authHeader: string | undefined,
  year: number,
  month: number
) => {
  let response = null;
  let data = null;

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await deleteGoalRepository(data.user, year, month);

    if (fullData) {
      response = await deleted();
    } else {
      response = await badRequest();
    }
  } else {
    response = await badRequest();
  }

  return response;
};
