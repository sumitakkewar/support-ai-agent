import express from 'express';
import { signup, login } from '../controller/AuthController.js';
import { validateSignupInput, validateLoginInput } from '../middleware/authValidation.js';

class AuthRouter {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post('/signup', validateSignupInput, signup);
    this.router.post('/login', validateLoginInput, login);
  }

  getRouter() {
    return this.router;
  }
}

const authRouter = new AuthRouter();
export default authRouter
