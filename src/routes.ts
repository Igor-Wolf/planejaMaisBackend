import { Router } from "express";
import {
  autenticateAccountByEmail,
  createUser,
  deleteUser,
  forgotPass,
  getMyAcount,
  getProtegido,
  newPassword,
  updateUser,
  userAutentication,
} from "./controllers/login-controller";
import {
  createGoal,
  deleteGoal,
  getMyGoal,
  updateGoal,
} from "./controllers/goals-controller";
import {
  createExpense,
  deleteExpense,
  getExpenseAll,
  getExpenseByCategory,
  getExpenseByDate,
  getExpenseByDescription,
  getExpenseByFilter,
  getExpenseById,
  updateExpense,
} from "./controllers/expenses-controller";
import {
  getAllDateValues,
  getAllValues,
} from "./controllers/operations-controller";

const router = Router();

//----------------------------------------------------------------------------- USER

router.get("/login/protected", getProtegido);
router.get("/login/myAccount", getMyAcount);
router.get("/login/autenticateAccountEmail", autenticateAccountByEmail);
router.get("/login/forgotPassword/:email", forgotPass);

router.post("/login/create", createUser);
router.post("/login/autentication", userAutentication);
router.post("/login/newPassword", newPassword);

router.patch("/login/update", updateUser);

router.delete("/login/delete", deleteUser);

//----------------------------------------------------------------------------- GOALS

router.get("/goal/myGoal", getMyGoal);

router.post("/goal/create", createGoal);

router.patch("/goal/update/:id", updateGoal);

router.delete("/goal/delete/:id", deleteGoal);

//----------------------------------------------------------------------------- Expenses

router.get("/expense/myExpenseById/:id", getExpenseById);
router.get("/expense/myExpenseByDescription/:description", getExpenseByDescription);
router.get("/expense/myExpenseByCategory/:category", getExpenseByCategory);
router.get("/expense/myExpenseByDate/:date", getExpenseByDate);
router.get("/expense/myExpenseAll", getExpenseAll)
router.get("/expense/myExpenseByFilter", getExpenseByFilter)

router.post("/expense/create", createExpense);

router.patch("/expense/update/:id", updateExpense);

router.delete("/expense/delete/:id", deleteExpense);

//----------------------------------------------------------------------------- Operations

router.get("/operation/allValues", getAllValues);
router.get("/operation/allDateValues/:date", getAllDateValues);

export default router;
