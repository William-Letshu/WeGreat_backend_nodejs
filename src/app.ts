import express from "express";
import userRoutes from "./routes/users";
import merchantRoutes from "./routes/merchants";
import serviceRoutes from "./routes/services";
import bookingRoutes from "./routes/bookings";
import cookieparser from "cookie-parser";
import { getMerchantByEmail, getMerchantByUserName, getUserByEmail, getUserByUserName, isPasswordMatch } from "./database";
import { encrypt } from "./utils/encryption";
import * as jwt from 'jsonwebtoken';
import { authenticateJWT } from "./middleware/login_auth";
require("dotenv").config();

const secretKey: string = process.env.ACCESS_TOKEN_SECRET as string;
const refreshKey: string = process.env.REFRESH_TOKEN_SECRET as string;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());


app.use("/api/users", authenticateJWT, userRoutes);
app.use("/api/merchants", authenticateJWT, merchantRoutes);
app.use("/api/services", authenticateJWT, serviceRoutes);
app.use("/api/bookings", authenticateJWT, bookingRoutes);

app.post('/login', async (req, res) => {
  const { username, password, email, type } = req.body;

  if (!username && !email) {
    return res.status(400).json({ message: 'Please provide either a username or an email.' });
  }

  try {
    let user;
    if (username) {
      if (type === 'user') {
        user = await getUserByUserName(username);
      } else if (type == "merchant") {
        user = await getMerchantByUserName(username);
      }

    } else {

      if (type == 'user') {
        user = await getUserByEmail(email);
      } else if (type == "merchant") {
        user = await getMerchantByEmail(email)
      }

    }

    if (user && await isPasswordMatch(password, user.password)) {
      const tokens = generateTokens(user.username, user.email);
      res.cookie('jwt', refreshKey, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.setHeader('Authorization', `Bearer ${tokens.accessToken}`);
      return res.status(200).json({ accessToken: tokens.accessToken });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

function generateTokens(username: string, email: string) {
  const accessToken = jwt.sign({ username, email }, secretKey, { expiresIn: '10m' });
  const refreshToken = jwt.sign({ username }, secretKey, { expiresIn: '1d' });
  return { accessToken, refreshToken };
}

app.post('/refresh', (req, res) => {
  if (req.cookies?.jwt) {

    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt;
    const { username, password, email, type } = req.body;

    // Verifying refresh token
    jwt.verify(refreshToken, refreshKey,
      (err: any) => {
        if (err) {

          // Wrong Refesh Token
          return res.status(406).json({ message: 'Unauthorized' });
        }
        else {
          // Correct token we send a new access token
          const accessToken = jwt.sign({
            username: username,
            email: email
          }, secretKey, {
            expiresIn: '10m'
          });
          return res.json({ accessToken });
        }
      })
  } else {
    return res.status(406).json({ message: 'Unauthorized' });
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
