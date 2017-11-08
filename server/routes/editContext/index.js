import express from 'express';
import getContextSynonym from './getContextSynonym';
import editAddSynonym from './editAddSynonym';
import editDeleteSynonym from './editDeleteSynonym';
import getContextInfo from './getContextInfo';

let router = express.Router();

router.post('/',getContextSynonym);
router.post('/editAddSynonym',editAddSynonym);
router.post('/editDeleteSynonym',editDeleteSynonym);
router.post('/getContextInfo',getContextInfo);

export default router;