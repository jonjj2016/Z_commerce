import express from 'express';
import { find, get } from '../Controllers/ProductController.js'
const router = express.Router();

router.route('/').get(find);
router.route('/:id').get(get);




export default router;