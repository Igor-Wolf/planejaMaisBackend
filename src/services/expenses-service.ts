import { ExpensesModel, validateExpense } from "../models/expenses.model";
import {
  deleteExpenseAllRepository,
  deleteExpenseRepository,
  getExpenseAllRepository,
  getExpenseByCategoryRepository,
  getExpenseByDateRepository,
  getExpenseByDescriptionRepository,
  getExpenseByFilterRepository,
  getExpenseByIdRepository,
  insertExpense,
  updateExpenseRepository,
} from "../repositories/expenses-repository";
import { auth } from "../utils/auth";
import { badRequest, conflict, created, ok } from "../utils/http-helper";

export const createExpenseService = async (
  bodyValue: ExpensesModel,
  authHeader: string | undefined
) => {
  const isvalid = await validateExpense(bodyValue);

  if (!isvalid) {
    const response = await badRequest();
    return response;
  }

  const decoded = await auth(authHeader);
  let response = null;
  if (decoded) {
    bodyValue.user = decoded.user;
    const data = await insertExpense(bodyValue);
    if (data) {
      response = await created();
      response.body = data
    } else {
      response = await conflict();
    }
  } else {
    response = await badRequest();
  }

  return response;
};

export const getExpenseByIdService = async (
  authHeader: string | undefined,
  _id: string
) => {
  let response = null;
  let data = null;

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await getExpenseByIdRepository(data.user, _id);

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
export const getExpenseByDescriptionService = async (
  authHeader: string | undefined,
  description: string
) => {
  let response = null;
  let data = null;

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await getExpenseByDescriptionRepository(
      data.user,
      description
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
export const getExpenseByCategoryService = async (
  authHeader: string | undefined,
  category: string
) => {
  let response = null;
  let data = null;

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await getExpenseByCategoryRepository(data.user, category);

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
export const getExpenseByDateService = async (
  authHeader: string | undefined,
  date: string,
  skip: number,
  limit: number,
  order: string,
  category: string,
  description: string,
  startValue: number,
  endValue: number
) => {
  let response = null;
  let data = null;

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await getExpenseByDateRepository(data.user, date, skip, limit, order, category, description, startValue, endValue);

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
export const getExpenseAllService = async (
  authHeader: string | undefined,
  skip: number,
  limit: number,
  order: string
) => {
  let response = null;
  let data = null;

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await getExpenseAllRepository(data.user, skip, limit, order);

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
export const getExpenseByFilterService = async (
  authHeader: string | undefined,
  skip: number,
  limit: number,
  order: string,
  startDate: string,
  endDate: string,
  category: string,
  description: string,
  startValue: number,
  endValue: number
) => {
  let response = null;
  let data = null;

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await getExpenseByFilterRepository(data.user, skip, limit, order, startDate, endDate, category, description, startValue, endValue);

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

export const deleteExpenseService = async (
  authHeader: string | undefined,
  id: string
) => {
  let response = null;
  let data = null;

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await deleteExpenseRepository(data.user, id);

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
export const deleteExpenseAllService = async (
  authHeader: string | undefined,
  
) => {
  let response = null;
  let data = null;

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await deleteExpenseAllRepository(data.user);

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

export const updateExpenseService = async (
  authHeader: string | undefined,
  bodyValue: ExpensesModel,
  id: string
) => {
  let response = null;
  let data = null;
  const isvalid = await validateExpense(bodyValue);

  if (!isvalid) {
    const response = await badRequest();
    return response;
  }

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    bodyValue.user = data.user;
    const fullData = await updateExpenseRepository(data.user, bodyValue, id);

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
