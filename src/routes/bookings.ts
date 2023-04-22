import express from "express";
import {
  getAllBookings,
  getBooking,
  createNewBooking,
  updateBookingById,
  deleteBookingById,
} from "../controllers/bookings";

const router = express.Router();

router.get("/", getAllBookings);
router.get("/:id", getBooking);
router.post("/", createNewBooking);
router.put("/:id", updateBookingById);
router.delete("/:id", deleteBookingById);

export default router;
