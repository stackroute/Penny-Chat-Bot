import register from '../../model/register_schema';
import staticConfig from './staticconfig';
import express from 'express';

//Get method is used to check id exists
export default(req, res) => {
  try{
    register.find({_id:req.params.id},(err,check)=>{
      
      if(err){
        
      res.json({message : staticConfig.verify_user.messageOnIdNotFound ,Error : err});    //response to client
    }
    else if(check==undefined){
      
     res.json({message: staticConfig.verify_user.messageonDataUndefined,data:null});
   }
        //If id exists we are checking if status is false, we verify and make status true

        else if(check[0].status==false){
          register.update({_id:req.params.id},{$set:{"status":true}},{upsert:true},(err,data)=>{
            if(err)
            {
             res.json({message : staticConfig.verify_user.messageOnUpdateFailure ,Error : err});
           }
           else if(data==undefined){
             res.json({message:staticConfig.verify_user.messageOnVerificationUndefined,data:null});
           }
           else
           {
             register.find({_id : req.params.id}, (err,data) => {
               res.json({message: staticConfig.verify_user.messageOnVerificationSuccess ,"userdata" : data[0]});
             })

           }
         })
        }
        else {
          res.json({message: staticConfig.verify_user.messageOnVerificationFailure ,"userdata":check});
        }
      })
  }catch(error){        //error handling
    res.json({status:false, message:staticConfig.errorMessage.val,data:error});
  }
};