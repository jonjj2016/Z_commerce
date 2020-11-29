import express from 'express';
import { authUser, getUser, registerUser } from '../Controllers/UserControllers.js';
import { Protect } from '../Middleware/authMiddleware.js'
const router = express.Router();

router.post("/", registerUser);
router.post('/login', authUser);
router.get('/profile', Protect, getUser)



export default router;