import express from "express";
import {
  createNewConversation,
  getConversation,
} from "../controllers/conservation";

const router = express.Router();

router.post("/", createNewConversation);
router.get("/:id", getConversation);

export default router;
