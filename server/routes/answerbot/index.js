import express from 'express';
const router = express.Router();
import answer from './answer';
import getdata from './getdata';
import referlink from './referlink';
import unanswerQues from './unansweredques';

//Calls answer route

router.post('/',answer);
router.get('/',getdata);
router.post('/referlink',referlink);
router.post('/unanswerQues',unanswerQues);
export default router;
