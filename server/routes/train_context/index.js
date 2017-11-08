import express from 'express';
import addcontext from './addcontext';
import addsynonyms from './addcontextsyn'
import deleteContext from './deleteContext'

let router = express.Router();

router.post('/',addcontext);
router.put('/',addsynonyms);
router.post('/deleteContext',deleteContext);

export default router;