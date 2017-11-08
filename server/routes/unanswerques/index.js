import express from 'express';
import unans from './unanswerques';
import adminques from './adminques';
import deletePendingQuestions from './deletePendingQuestions';
let router = express.Router();

router.get('/',unans)
router.post('/',adminques)
router.put('/delete',deletePendingQuestions)
export default router;