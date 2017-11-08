import express from 'express';
const router = express.Router();
import forcelogout from './forcelogout';

//Calls forceLogout route

router.put('/',forcelogout);
export default router;