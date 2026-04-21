import { Router } from "express";
import {
  signUp,
  login,
  fetchAllUsers,
  getSingle,
  deleteUser,
  logOut,
} from "../controllers/UserController.js";
import { checkToken } from "../middleware/midwareAuth.js";
const router = Router();

router
  .post("/sign-up", signUp)
  .post("/Login", login)
  .get("/Users", checkToken, fetchAllUsers)
  .get("/user/:id", checkToken, getSingle)
  .delete("/delete-user/:id", deleteUser)
  .get("/logout", checkToken, logOut);

export default router;
