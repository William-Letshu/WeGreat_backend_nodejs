import { Request, Response } from "express";
import { createConversation, getConversationById } from "../database";
import { Conversation } from "../models/Conservation";

export async function createNewConversation(req: Request, res: Response) {
  try {
    const { user_id, merchant_id } = req.body;
    const newConversation: Conversation = await createConversation(user_id,merchant_id);
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(500).json({ message: "Error creating conversation" });
  }
}

export async function getConversation(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const conversation = await getConversationById(id);
    if (conversation) {
      res.json(conversation);
    } else {
      res.status(404).json({ message: "Conversation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversation" });
  }
}
