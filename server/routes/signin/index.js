import express from 'express';
import signin from './signin';
import passport from 'passport';
import facebookLogin from './fbLogin';
import googleLogin from './googleLogin';
const router = express.Router();
//calls sign in route
router.post('/login',signin);
facebookLogin(router,passport);
googleLogin(router,passport);


export default router;