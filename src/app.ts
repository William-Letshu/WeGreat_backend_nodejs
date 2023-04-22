import express from "express";
import userRoutes from "./routes/users";
import merchantRoutes from "./routes/merchants";
import serviceRoutes from "./routes/services";
import bookingRoutes from "./routes/bookings";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Register routes
app.use("/api/users", userRoutes);
app.use("/api/merchants", merchantRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes); // Add this line

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
