import express from 'express';
import data from '../../model/register_schema';
import  staticConfig from './staticconfig';          // File for static message
import logger from '../../log4js';
import bcrypt from 'bcrypt'

// user new password  
export default (req, res) => {
  try{
    // find the user exist or not

    data.find({_id:req.params.id},(err,user) => {
    // handle error 
    if(err){                            //When error
      logger.info({message:staticConfig.setpassword.updateMessageErr});
      res.json({message:staticConfig.setpassword.updateMessageErr});
    }
    else if(user==undefined){                   //When data returned is undefined
      logger.info({message:staticConfig.setpassword.messageUndefined});
      res.json({message:staticConfig.setpassword.messageUndefined,status:false,"userdata":null});
    }    
        // after find check specific user and update its password
        else if(user[0].status==false) {

          let password = req.body.password;
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(password, salt)
          data.update({_id:req.params.id},
            {$set:{status:true,password:hash}},(err,data1) => {
              if(err)
              {
                logger.info(staticConfig.setpassword.updateMessageErr)
                res.json({message:staticConfig.setpassword.updateMessageErr});
              }
              else if(data1==undefined){
                logger.info(staticConfig.setpassword.updateMessageErr)
                res.json({message:staticConfig.setpassword.updateMessageErr,status:false,data:null});
              }
              else
              {
               logger.info(staticConfig.setpassword.updateMessageScs)

               res.json({status : true, message:staticConfig.setpassword.updateMessageScs,"userdata" : user[0]});

             }
           })}

          else {
            logger.info(staticConfig.setpassword.finalMessageErr)
            res.json({status : false, message:staticconfig.setpassword.finalMessageErr});
          }
        });

  }
  
  catch(error){
    logger.info({message:staticConfig.errorMessage.val});
    res.json({status:false, message:staticConfig.errorMessage.val,data:error});

  }


}