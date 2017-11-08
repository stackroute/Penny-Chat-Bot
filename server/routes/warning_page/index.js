/*Preeti Singh
22/10/2017*/

import express from 'express';
import warning_page from './warning_page';
const router = express.Router();

router.get('/:id',warning_page);

export default router;
