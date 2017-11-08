import user from '../../model/register_schema';
import express from 'express'; 
import staticconfig from './staticconfig';

export default (req,res) => {
  user.updateOne({'email' : req.body.email }, {$set : {badCount : 0}},
    (err, data) => {
      if(err) {
      //error occured
      res.json({status:true,message :staticconfig.forcelogout.Error, userdata : null}) 
    }

    else {
      //reset bad count
      res.json({status : true, message:staticconfig.forcelogout.ResetBadCoun})
    }
  })
}