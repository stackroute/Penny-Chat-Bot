import data from './../../model/register_schema';
import staticConfig from './staticconfig' ;   //file for error messages
import passport from 'passport';
import logger from './../../log4js';
import config from './../../config/config';

const nodemailer = require('nodemailer');

module.exports= ('/',(req, res) => {
  try{

    let transporter = nodemailer.createTransport({
     service: staticConfig.forgotpassword.MessageNodemailService,
     auth:{
       user:staticConfig.forgotpassword.MessageNodemailAuthEmail,//sender address
       pass: staticConfig.forgotpassword.MessageNodemailAuthPassword//sender password 
      }
    });
   let mailOptions={};

  data.find({"email" : req.body.email}, (err,data1) => {
      
    if(data1.length==0){//email not registered
      logger.info(staticConfig.forgotpassword.MessageErrorNotFind)
      res.json({status:false, message:staticConfig.forgotpassword.MessageErrorNotFind})
    }
    else {
    data.update({"email": req.body.email}, {$set:{
      "status":false}},(err1,data2) => {
        
        if(err1){ // error in update
          logger.info(staticConfig.forgotpassword.MessageErrorNotUpdate)
          res.json({status:false, message:staticConfig.forgotpassword.MessageErrorNotUpdate});
        }
        else if(data2 == undefined) {
          logger.info(staticConfig.forgotpassword.MessageErrorNotUpdate)
          res.json({status:false, message:staticConfig.forgotpassword.MessageErrorNotUpdate});  
        }
        else {
          
          mailOptions = {
         from: staticConfig.forgotpassword.MessageNodemailOptionEmail,// sender address
         to: data1[0].email,// list of receivers
         subject: staticConfig.forgotpassword.MessageNodemailOptionSubject,// Subject line
         html:`<html xmlns="http://www.w3.org/1999/xhtml">
         <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title></title>
         </head>
         <body style="font-family:-apple-system, '.SFNSText-Regular', 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif; color: #666666 ; background:white; text-decoration: none;">
           <table width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
             <tr align="center">
               <td valign="top" style="width: 100%;">
               <table style="padding: 0px; border: 0; max-width: 520px; text-align: center;" width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
                 <tr align="center">
                  <td style="width: 100%; margin: 0px 10px; line-height: 24px; font-size: 14pt; font-weight: bold; color: #333333 ;">
                     <h1>Hi `+data1[0].name+`</h1>
                     <p style="margin: 0; padding: 0;">We got your request to change password, Please click below.</p>
                  </td>
                   </tr>
                   <tr align="center">
                    <td style="height: 30px; width: 100%;">&nbsp;</td>
                   </tr>
                   <tr align="center">
                      <td style="width: 100%; margin: 0px 10px; line-height: 24px; font-size: 11pt;">
                    <a style="padding: 10px 20px; border: 1px solid #283e4a ; 
                   -webkit-border-radius: 999em; -moz-border-radius: 999em;
                   border-radius: 999em; line-height: 24px; font-size: 11pt; 
                   background-color: #283e4a ; color: white; text-decoration: none;" 
                   href="`+config.clientRedirectUrl+`/#/setpassword/`+data1[0].username+`/`+data1[0]._id+`">Reset Password</a>
                   </td>
                 </tr>
               </table>
               </td>
             </tr>
           </table>
           <h3 style="text-align: -webkit-center">Thank You !!</h3>
         </body>
         </html>`

        }
        let a;
        transporter.sendMail(mailOptions, function(error, info){
           if(error){
            logger.info(staticConfig.forgotpassword.MessageErrorMailNotSent)
            res.json({status:false, message:staticConfig.forgotpassword.MessageErrorMailNotSent});
           }else{
            logger.info(staticConfig.forgotpassword.MessageSuccessMailSent)
            res.json({status:true,message:staticConfig.forgotpassword.MessageSuccessMailSent,info:info});
           }
         })
        //res.json({status:true,message:staticConfig.forgotpassword.MessageSuccessMailSent});

        }
      });
    };
  });
  }catch(error){ //error handle
    logger.info(staticConfig.errorMessage.val)
    res.json({status:false, message:staticConfig.errorMessage.val,data:error});
  }      
});