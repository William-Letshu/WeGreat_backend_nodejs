import {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
  } from "../database";
  import { Request, Response } from "express";
  import { Booking } from "../models/Booking";
  
  export async function getAllBookings(req: Request, res: Response) {
    try {
      const bookings = await getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bookings" });
    }
  }
  
  export async function getBooking(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const booking = await getBookingById(id);
  
      if (booking) {
        res.json(booking);
      } else {
        res.status(404).json({ message: "Booking not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching booking" });
    }
  }
  
  export async function createNewBooking(req: Request, res: Response) {
    try {
      const bookingData: Booking = req.body;
      const newBooking = await createBooking(bookingData);
      res.status(201).json(newBooking);
    } catch (error) {
      res.status(500).json({ message: "Error creating booking" });
    }
  }
  
  export async function updateBookingById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const bookingData: Partial<Booking> = req.body;
      const updatedBooking = await updateBooking(id, bookingData);
  
      if (updatedBooking) {
        res.json(updatedBooking);
      } else {
        res.status(404).json({ message: "Booking not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating booking" });
    }
  }
  
  export async function deleteBookingById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const success = await deleteBooking(id);
  
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Booking not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting booking" });
    }
  }
  