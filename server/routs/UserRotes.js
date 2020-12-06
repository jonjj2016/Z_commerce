import express from 'express';
import { authUser, getUser, registerUser, patchUser } from '../Controllers/UserControllers.js';
import { Protect } from '../Middleware/authMiddleware.js'
const router = express.Router();

router.post("/", registerUser);
router.post('/login', authUser);
router.route('/profile').get(Protect, getUser).put(Protect, patchUser)



export default router;