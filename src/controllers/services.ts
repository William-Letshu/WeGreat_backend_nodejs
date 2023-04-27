import { Request, Response } from "express";
import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from "../database";
import { Service } from "../models/Service";

// Get all services
export async function getAllServices(req: Request, res: Response) {
  try {
    const services = await getServices();
    res.status(200).json({ services });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get a service by ID
export async function getService(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const service = await getServiceById(parseInt(id));
    if (service) {
      res.json({ service });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create a new service
export async function createNewService(req: Request, res: Response) {
  const service = new Service(req.body);
  try {
    const newService = await createService(service);
    res.status(201).json({ service: newService });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update an existing service
export async function updateServiceById(req: Request, res: Response) {
  const { id } = req.params;
  const serviceUpdates = req.body;
  try {
    const updatedService = await updateService(parseInt(id), serviceUpdates);
    if (updatedService) {
      res.json({ service: updatedService });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete a service
export async function deleteServiceById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const deleted = await deleteService(parseInt(id));
    if (deleted) {
      res.status(200).json({ message: "Service deleted successfully" });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
