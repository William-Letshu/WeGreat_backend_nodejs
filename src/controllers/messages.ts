import { Request, Response } from "express";
import { createMessage, getMessageById } from "../database";
import { Message } from "../models/Message";

export async function createNewMessage(req: Request, res: Response) {
  try {
    const { conversation_id, sender_type, sender_id, content } = req.body;
    const newMessage: Message = await createMessage(
        conversation_id,
        sender_type,
        sender_id,
        content
      );
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error creating message" });
  }
}

export async function getMessage(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const message = await getMessageById(id);
    if (message) {
      res.json(message);
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching message" });
  }
}