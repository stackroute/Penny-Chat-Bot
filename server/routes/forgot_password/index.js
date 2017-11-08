/*Preeti Singh
22/10/2017*/

import express from 'express';
import forgotPassword from './forgotpassword';

let router = express.Router();

router.post('/',forgotPassword);

export default router;