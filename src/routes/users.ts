import express from "express";
import {
  getAllUsers,
  getUser,
  createNewUser,
  updateUserById,
  deleteUserById,
  getUserEmail
} from "../controllers/users";

const router = express.Router();

router.get("/email",getUserEmail)
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createNewUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
