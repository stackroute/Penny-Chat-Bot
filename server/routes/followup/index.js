import express from 'express';
const router = express.Router();
import followup from './followup';
import nextfollowup from './nextfollowup';
import setflow from './setflow';
import getfollow from './getfollow';
import getdata from './getdata';

router.post('/selectfollow',followup);
router.get('/',getfollow);
router.post('/',setflow);
router.put('/',nextfollowup);
router.get('/getdata/:name',getdata);
export default router;
