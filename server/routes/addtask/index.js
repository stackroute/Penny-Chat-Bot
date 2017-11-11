import express from 'express';
const router = express.Router();
import addtask from './addtask';

router.post('/',addtask);		//Calls the route
export default router;