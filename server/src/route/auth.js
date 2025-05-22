import express from 'express';
import { signup, login } from '../controller/AuthController.js';
import { validateSignupInput, validateLoginInput } from '../middleware/authValidation.js';

const router = express.Router();

router.post('/signup', validateSignupInput, signup);
router.post('/login', validateLoginInput, login);

export default router;
