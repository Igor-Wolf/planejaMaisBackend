import {
  getAllDateValuesRepository,
  getAllValuesRepository,
} from "../repositories/operations-repository";
import { auth } from "../utils/auth";
import { badRequest, ok } from "../utils/http-helper";

export const getAllValuesService = async (
  authHeader: string | undefined,
  startDate: string,
  endDate: string,
  category: string,
  description: string,
  startValue: number,
  endValue: number,
) => {
  let response = null;
  let data = null;

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await getAllValuesRepository(
      data.user,
      startDate,
      endDate,
      category,
      description,
      startValue,
      endValue,
    );

    if (fullData) {
      let values = 0;
      fullData.forEach((element) => {
        values += element.value;
      });
      console.log(values);
      const returnData = { value: (Math.round(values * 100) / 100).toFixed(2) };
      console.log(returnData);

      response = await ok(returnData);
    } else {
      response = await badRequest();
    }
  } else {
    response = await badRequest();
  }

  return response;
};

export const getAllDateValuesService = async (
  authHeader: string | undefined,
  date: string,
  category: string,
  description: string,
  startValue: number,
  endValue: number,
) => {
  let response = null;
  let data = null;

  data = await auth(authHeader); /// verificação do token

  if (data && typeof data !== "string") {
    const fullData = await getAllDateValuesRepository(
      data.user,
      date,
      category,
      description,
      startValue,
      endValue,
    );

    if (fullData) {
      let values = 0;
      fullData.forEach((element) => {
        values += element.value;
      });
      const returnData = { value: (Math.round(values * 100) / 100).toFixed(2) };
      response = await ok(returnData);
    } else {
      response = await badRequest();
    }
  } else {
    response = await badRequest();
  }

  return response;
};
