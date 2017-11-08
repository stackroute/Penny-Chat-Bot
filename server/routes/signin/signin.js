import express from 'express';
import register from '../../model/register_schema';
import jwt  from 'jsonwebtoken';
import config from '../../config/config';
import passport  from 'passport';
import nodemailer  from 'nodemailer';
import staticConfig  from './staticconfig';
import comparePassword from './../../util/comparePassword';

let router = express.Router();

router.post('/login', passport.authenticate('local-login'), (req, res, next)=> {
 try
 {
   res.json({status: true, message: staticConfig.signin.messagePasswordSuccessCheck, data: req.user});
 }
 catch(error)
 {
   res.json({status:false, message:staticConfig.errorMessage.val,data:error});
 }
});

module.exports = router;


