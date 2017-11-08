let express = require('express');
  let router = express.Router();
  //let RegisterUser = require('../../model/register_schema');
  //import logger from '../../log4js';
  const nodemailer = require('nodemailer');
  //let staticConfig = require('./mailconfig');

  export default (userData) => {
              var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth:{
                 user: 'dummyid20@gmail.com',
                 pass: 'dummyid2608'
               }
             });

              var mailOptions = {
                from: '"Dummy" <dummyid20@gmail.com', // sender address
                to: userData.email,
             // list of receivers
                subject: 'Verification Mail - Penny', // Subject line             
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
                <h1>Hi `+userData.name+`</h1>
                <p style="margin: 0; padding: 0;">Verify your email address</p>
                </td>
                </tr>
                <tr align="center" style="margin: 0px 10px;">
                <td style="width: 100%; line-height: 24px; font-size: 11pt;">
                <p>Thanks for registering an account with chatBot. Click to proceed </p>
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
                href="http://localhost:4200/#/redirect/`+userData._id+`">Verify your email</a>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </table>
                <h3 style="text-align: -webkit-center">Thank You !!</h3>
                </body>
                </html>`
               // html:'<a href="http://localhost:4200/redirect/'+data[0]._id+'">Please Verify</a>'
                //text:'Please verify your mail http://localhost:4200/redirect/'+data[0]._id+' Click on this.'
              };
              transporter.sendMail(mailOptions, function(error, info){
                if(error){
                  return false;
                }
                else {
                 return true;
                }
              });
            }



