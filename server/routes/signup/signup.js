let express = require('express');
  let router = express.Router();
  let RegisterUser = require('../../model/register_schema');
  import logger from '../../log4js';
  const nodemailer = require('nodemailer');
  let staticConfig = require('./staticconfig');
  import mailSent from '../../util/mail';

  export default (req, res, next)=> {

     console.log('a');
  RegisterUser.findOne({"email" :req.body.email },(err,data)=>{
    if(err){
      console.log('1',data);
      res.json({status:false,message:'not found',userdata:null});
    }
    else{
      console.log('2');

        if(data){
           res.json({status:false, message:staticConfig.signup.messageAlreadyExist});
           console.log('data',data);

        }
        else{
          console.log('3');
            let registerUser = new RegisterUser({
            name : req.body.name,
            /*username : req.body.username,*/
            /*contact_no : req.body.contactNo,*/
            email : req.body.email,
            password : req.body.password,
            type : "User",
            status : false

            })
      
            registerUser.save((err, user)=>{
               if(err) {
           // logger.info(staticConfig.signup.messageErrorNotFind)
                res.json({status:false, message : error});
              }
               else {
               let emailStaus = mailSent(user);
               if(emailStaus)
               {
                 res.json({status:true, message : staticConfig.signup.messageSuccessFind});
               }
               else
               {
                 res.json({status:true, message : staticConfig.signup.messageNodemailErrorEmail});
               }

              }
    
              })
          }
    }
  })
}
