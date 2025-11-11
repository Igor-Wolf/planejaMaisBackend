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

const router = Router();

router.get("/login/protected", getProtegido);
router.get("/login/myAccount", getMyAcount);
router.get("/login/autenticateAccountEmail", autenticateAccountByEmail);

router.get("/login/forgotPassword/:email", forgotPass);

router.post("/login/create", createUser);
router.post("/login/autentication", userAutentication);
router.post("/login/newPassword", newPassword);

router.patch("/login/update/:user", updateUser);

router.delete("/login/delete/:user", deleteUser);

export default router;
