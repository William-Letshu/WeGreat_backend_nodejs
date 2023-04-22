import express from "express";
import {
  getAllUsers,
  getUser,
  createNewUser,
  updateUserById,
  deleteUserById,
  getUserEmail
} from "../controllers/users";

import validateResource from "../middleware/auth"
import userSchema from "../schemas/users";

const router = express.Router();

router.get("/email",validateResource(userSchema),getUserEmail)
router.get("/", getAllUsers);
router.get("/:id",validateResource(userSchema), getUser);
router.post("/",validateResource(userSchema), createNewUser);
router.put("/:id",validateResource(userSchema), updateUserById);
router.delete("/:id",validateResource(userSchema), deleteUserById);

export default router;
