import express from 'express';
const router = express.Router();
import addtask from './addtask';

//Calls answer route

router.post('/',addtask);
export default router;