import express from 'express';
import trainIntent from './train_intent';
import traindomain from './traindomain';
import getIntent from './getIntent';
//import updateIntent from './updateIntent'
import getContext from './getContext';
import setSynonym from './setSynonym';
import contextsynonym from './contextsynonym';
import addsynonyms from './addsynonyms';
import addMoreSynonym from './addMoreSynonym';
import getRelatedEntity from './getRelatedEntity';
import deleteSynonym from './deleteSynonym';
import deleteIntent from './deleteIntent';
let router = express.Router();

router.post('/',trainIntent);
router.get('/',getIntent);
router.get('/getContext',getContext);
router.put('/',addsynonyms);
router.post('/traindomain', traindomain);
router.post('/setSynonym',setSynonym);
router.get('/getIntent', getIntent);
router.post('/addSynonym',addMoreSynonym);
router.post('/contextsynonym',contextsynonym);
router.post('/getRelatedEntity',getRelatedEntity);
router.put('/deleteSynonym',deleteSynonym);
router.put('/deleteIntent',deleteIntent);
//router.put('/updateIntent', updateIntent);
export default router;