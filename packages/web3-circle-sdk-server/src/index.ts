// Install necessary packages before running the server:

import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CircleSdk } from '../../web3-circle-sdk';
dotenv.config();
console.log('process.env.PORT', process.env.SERVER_PORT);
const app = express();
const PORT = process.env.SERVER_PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(express.json());

// Middleware to authenticate JWT tokens
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// POST endpoint for signIn
app.post('/signIn', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Here you would validate the username/password against your database
  if (username !== 'admin' || password !== 'password123') {
    return res.status(403).json({ message: 'Invalid username or password' });
  }

  const user = { name: username };
  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

  res.json({ data: { accessToken }, code: 0 });
});

// Example POST endpoint that requires authentication
app.post('/execute', authenticateToken, async (req: Request, res: Response) => {
  const serverSdk = new CircleSdk(process.env.CIRCLE_API_KEY, process.env.CIRCLE_SECRET);

  const { className, methodName, methodParams } = req.body;

  if (serverSdk[className] && typeof serverSdk[className][methodName] === 'function') {
    try {
      const methodResult = await serverSdk[className][methodName](methodParams);
      res.json({
        code: 0,
        data: methodResult,
      });
    } catch (e) {
      res.json({
        code: e.code || 1,
        error: e.error || 'An error occurred',
      });
    }
  } else {
    res.json({
      code: 1,
      error: `Method not found for ${className}.${methodName}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
