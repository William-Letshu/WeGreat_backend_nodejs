import express from "express";
import {
  getMerchants,
  getMerchantById,
  createMerchant,
  updateMerchant,
  deleteMerchant,
  getMerchantByEmail,
} from "../database";
import { Merchant } from "../models/Merchant";

const router = express.Router();

// Get all merchants
router.get("/", async (req, res) => {
  try {
    const merchants = await getMerchants();
    res.json(merchants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching merchants" });
  }
});

// Get merchant by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const merchant = await getMerchantById(id);

    if (merchant) {
      res.json(merchant);
    } else {
      res.status(404).json({ message: "Merchant not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching merchant" });
  }
});

// Create a new merchant
router.post("/", async (req, res) => {
  try {
    const merchantData: Merchant = req.body;
    const newMerchant = await createMerchant(merchantData);
    res.status(201).json(newMerchant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating merchant" });
  }
});

// Update a merchant by ID
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const merchantData: Partial<Merchant> = req.body;
    const updatedMerchant = await updateMerchant(id, merchantData);

    if (updatedMerchant) {
      res.json(updatedMerchant);
    } else {
      res.status(404).json({ message: "Merchant not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating merchant" });
  }
});

// Delete a merchant by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const success = await deleteMerchant(id);

    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Merchant not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting merchant" });
  }
});

// Get merchant by email
router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const merchant = await getMerchantByEmail(email);

    if (merchant) {
      res.json(merchant);
    } else {
      res.status(404).json({ message: "Merchant not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching merchant" });
  }
});

export default router;
