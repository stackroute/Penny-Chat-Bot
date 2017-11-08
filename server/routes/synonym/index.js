
import express from 'express';
import synonym from './addSynonym';
import relation from './addRelation';

let router = express.Router();

router.post('/',synonym);
router.post('/relation',relation);


export default router;