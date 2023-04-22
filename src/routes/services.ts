import express, { Request, Response } from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../database";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const services = await getServices();
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const service = await getServiceById(parseInt(req.params.id));
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const service = await createService(req.body);
    res.status(201).json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const service = await getServiceById(parseInt(req.params.id));
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    const updatedService = await updateService(service.id, req.body);
    res.json(updatedService);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const service = await getServiceById(parseInt(req.params.id));
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    await deleteService(service.id);
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
