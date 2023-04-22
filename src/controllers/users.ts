import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
  } from "../database";
  import { Request, Response } from "express";
  import { User } from "../models/User";
  
  export async function getAllUsers(req: Request, res: Response) {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error fetching users" });
    }
  }
  
  export async function getUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await getUserById(id);

      console.log("Getting all users")
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  }
  
  export async function createNewUser(req: Request, res: Response) {
    try {
      const userData: User = req.body;
      console.log(userData)
      const newUser = await createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error creating user" });
    }
  }
  
  export async function updateUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const userData: Partial<User> = req.body;
      const updatedUser = await updateUser(id, userData);
  
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user" });
    }
  }
  
  export async function deleteUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const success = await deleteUser(id);
  
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  }

  export async function getUserEmail(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const user = await getUserByEmail(email);

      console.log("Getting all users")
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  }
  