import express from 'express';
import getContextSynonym from './getContextSynonym';
import editAddSynonym from './editAddSynonym';
import editDeleteSynonym from './editDeleteSynonym';
import getContextInfo from './getContextInfo';
import editLink from './editLink';
import getIntentContext from './getIntentContext';

let router = express.Router();

router.post('/',getContextSynonym);
router.post('/editAddSynonym',editAddSynonym);
router.post('/editDeleteSynonym',editDeleteSynonym);
router.post('/getContextInfo',getContextInfo);
router.put('/editLink',editLink);
router.post('/getIntentContext',getIntentContext);

export default router;