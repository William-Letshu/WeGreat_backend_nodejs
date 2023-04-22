import { Pool } from "pg";
import { User } from "./models/User";
import { Merchant } from "./models/Merchant";
import { Service } from "./models/Service";
import { Booking } from "./models/Booking";
import { Conversation } from "./models/Conservation";
import { Message } from "./models/Message";
import bcrypt from 'bcrypt';

require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

// Users CRUD operations
async function getUsers(): Promise<User[]> {
  const result = await pool.query("SELECT * FROM users");
  return result.rows.map((row) => new User(row));
}

async function getUserById(id: number): Promise<User | null> {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rowCount ? new User(result.rows[0]) : null;
}

async function createUser(user: User): Promise<User> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  const result = await pool.query(
    `INSERT INTO users (username, email, password, first_name, second_names, surname, identity_document, disabled)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      user.username,
      user.email,
      hashedPassword,
      user.first_name,
      user.second_names,
      user.surname,
      user.identity_document,
      user.disabled,
    ]
  );

  return new User(result.rows[0]);
}

async function updateUser(id: number, user: Partial<User>): Promise<User | null> {
  const result = await pool.query(
    `UPDATE users
     SET username = COALESCE($1, username),
         email = COALESCE($2, email),
         first_name = COALESCE($3, first_name),
         second_names = COALESCE($4, second_names),
         surname = COALESCE($5, surname),
         disabled = COALESCE($7, disabled)
     WHERE id = $8 RETURNING *`,
    [
      user.username,
      user.email,
      user.first_name,
      user.second_names,
      user.surname,
      user.disabled,
      id,
    ]
  );
  return result.rowCount ? new User(result.rows[0]) : null;
}

async function deleteUser(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return result.rowCount > 0;
}

async function getUserByEmail(email:string) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
  return result.rowCount ? new User(result.rows[0]) : null;
}

// TODO: Implement similar CRUD operations for the Merchant, Service, and Booking models

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
  // TODO: Export the CRUD operations for the Merchant, Service, and Booking models
};

// Merchant CRUD operations
async function getMerchants(): Promise<Merchant[]> {
    const result = await pool.query("SELECT * FROM merchants");
    return result.rows.map((row) => new Merchant(row));
  }
  
  async function getMerchantById(id: number): Promise<Merchant | null> {
    const result = await pool.query("SELECT * FROM merchants WHERE id = $1", [id]);
    return result.rowCount ? new Merchant(result.rows[0]) : null;
  }
  
  async function createMerchant(merchant: Merchant): Promise<Merchant> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(merchant.password, salt);

    const result = await pool.query(
      `INSERT INTO merchants (username, email, password, first_name, second_names, surname, description, police_clearance)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        merchant.username,
        merchant.email,
        hashedPassword,
        merchant.first_name,
        merchant.second_names,
        merchant.surname,
        merchant.description,
        merchant.police_clearance,
      ]
    );
    return new Merchant(result.rows[0]);
  }
  
  async function updateMerchant(id: number, merchant: Partial<Merchant>): Promise<Merchant | null> {
    const result = await pool.query(
      `UPDATE merchants
       SET username = COALESCE($1, username),
           email = COALESCE($2, email),
           first_name = COALESCE($3, first_name),
           second_names = COALESCE($4, second_names),
           surname = COALESCE($5, surname),
           identity_document = COALESCE($6, identity_document),
           description = COALESCE($7, description),
           police_clearance = COALESCE($8, police_clearance)
       WHERE id = $9 RETURNING *`,
      [
        merchant.username,
        merchant.email,
        merchant.first_name,
        merchant.second_names,
        merchant.surname,
        merchant.description,
        merchant.police_clearance,
        id,
      ]
    );
    return result.rowCount ? new Merchant(result.rows[0]) : null;
  }
  
  async function deleteMerchant(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM merchants WHERE id = $1", [id]);
    return result.rowCount > 0;
  }

  async function getMerchantByEmail(email: string): Promise<Merchant | null> {
    const result = await pool.query("SELECT * FROM merchants WHERE email = $1", [email]);
    return result.rowCount ? new Merchant(result.rows[0]) : null;
  }
  
  // Export the merchant CRUD operations
  export {
    getMerchants,
    getMerchantById,
    createMerchant,
    updateMerchant,
    deleteMerchant,
    getMerchantByEmail
  };

// Service CRUD operations
async function getServices(): Promise<Service[]> {
    const result = await pool.query("SELECT * FROM services");
    return result.rows.map((row) => new Service(row));
  }
  
  async function getServiceById(id: number): Promise<Service | null> {
    const result = await pool.query("SELECT * FROM services WHERE id = $1", [id]);
    return result.rowCount ? new Service(result.rows[0]) : null;
  }
  
  async function createService(service: Service): Promise<Service> {
    const result = await pool.query(
      `INSERT INTO services (merchant_id, service_name, description, price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        service.merchant_id,
        service.service_name,
        service.description,
        service.price,
      ]
    );
    return new Service(result.rows[0]);
  }
  
  async function updateService(id: number, service: Partial<Service>): Promise<Service | null> {
    const result = await pool.query(
      `UPDATE services
       SET merchant_id = COALESCE($1, merchant_id),
           service_name = COALESCE($2, service_name),
           description = COALESCE($3, description),
           price = COALESCE($4, price)
       WHERE id = $5 RETURNING *`,
      [
        service.merchant_id,
        service.service_name,
        service.description,
        service.price,
        id,
      ]
    );
    return result.rowCount ? new Service(result.rows[0]) : null;
  }
  
  async function deleteService(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM services WHERE id = $1", [id]);
    return result.rowCount > 0;
  }
  
  // Export the service CRUD operations
  export {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
  };

  // Booking CRUD operations
async function getBookings(): Promise<Booking[]> {
    const result = await pool.query("SELECT * FROM bookings");
    return result.rows.map((row) => new Booking(row));
  }
  
  async function getBookingById(id: number): Promise<Booking | null> {
    const result = await pool.query("SELECT * FROM bookings WHERE id = $1", [id]);
    return result.rowCount ? new Booking(result.rows[0]) : null;
  }
  
  async function createBooking(booking: Booking): Promise<Booking> {
    const result = await pool.query(
      `INSERT INTO bookings (user_id, service_id, booking_date, booking_status, booking_rating)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        booking.user_id,
        booking.service_id,
        booking.booking_date,
        booking.booking_status,
        booking.booking_rating,
      ]
    );
    return new Booking(result.rows[0]);
  }
  
  async function updateBooking(id: number, booking: Partial<Booking>): Promise<Booking | null> {
    const result = await pool.query(
      `UPDATE bookings
       SET user_id = COALESCE($1, user_id),
           service_id = COALESCE($2, service_id),
           booking_date = COALESCE($3, booking_date),
           booking_status = COALESCE($4, booking_status),
           booking_rating = COALESCE($5, booking_rating)
       WHERE id = $6 RETURNING *`,
      [
        booking.user_id,
        booking.service_id,
        booking.booking_date,
        booking.booking_status,
        booking.booking_rating,
        id,
      ]
    );
    return result.rowCount ? new Booking(result.rows[0]) : null;
  }
  
  async function deleteBooking(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM bookings WHERE id = $1", [id]);
    return result.rowCount > 0;
  }
  
  // Export the booking CRUD operations
  export {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
  };

  // Conversations CRUD operations
async function createConversation(user_id: number, merchant_id: number): Promise<Conversation> {
  const result = await pool.query(
    `INSERT INTO conversations (user_id, merchant_id)
     VALUES ($1, $2) RETURNING *`,
    [user_id, merchant_id]
  );
  return new Conversation(result.rows[0]);
}

async function getConversationById(id: number): Promise<Conversation | null> {
  const result = await pool.query("SELECT * FROM conversations WHERE id = $1", [id]);
  return result.rowCount ? new Conversation(result.rows[0]) : null;
}

async function getConversationsForUser(user_id: number): Promise<Conversation[]> {
  const result = await pool.query("SELECT * FROM conversations WHERE user_id = $1", [user_id]);
  return result.rows.map((row) => new Conversation(row));
}

async function getConversationsForMerchant(merchant_id: number): Promise<Conversation[]> {
  const result = await pool.query("SELECT * FROM conversations WHERE merchant_id = $1", [merchant_id]);
  return result.rows.map((row) => new Conversation(row));
}

// Messages CRUD operations
async function createMessage(conversation_id: number, sender_type: string, sender_id: number, content: string): Promise<Message> {
  const result = await pool.query(
    `INSERT INTO messages (conversation_id, sender_type, sender_id, content, timestamp)
     VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
    [conversation_id, sender_type, sender_id, content]
  );
  return new Message(result.rows[0]);
}

async function getMessageById(id: number): Promise<Message | null> {
  const result = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
  return result.rowCount ? new Message(result.rows[0]) : null;
}

async function getMessagesForConversation(conversation_id: number): Promise<Message[]> {
  const result = await pool.query("SELECT * FROM messages WHERE conversation_id = $1 ORDER BY timestamp ASC", [conversation_id]);
  return result.rows.map((row) => new Message(row));
}

// Export the conversations and messages CRUD operations
export {
  createConversation,
  getConversationById,
  getConversationsForUser,
  getConversationsForMerchant,
  createMessage,
  getMessageById,
  getMessagesForConversation,
};

  
    