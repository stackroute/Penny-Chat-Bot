
let express = require('express');
let router = express.Router();
let demo=require('../../model/register_schema');
import staticconfig from './Config';
import logger from '../../log4js';

router.post('/', function(req, res) {
  
  let data = req.body.question;
  if(data != undefined) {
    demo.update({email : req.body.email},
      {$addToSet : {questions : data}},(err,data)=>{
        if(err)
        {
          logger.info(staticconfig.ques.DataNotFound);   //making logs
          res.json({status:false,message:staticconfig.ques.DataNotFound,data:null});    //response to client
        } else {
          demo.find({email : req.body.email},(err,da) => {
            //console.log(da);
            if(da.length > 0) {
              logger.info(staticconfig.ques.DataFound);   //making logs
               res.json({status:true,message:staticconfig.ques.DataFound,data:da[0].questions});
            } else if(err) {
              logger.info(staticconfig.ques.DataNotFound);   //making logs
              res.json({status:false,message:staticconfig.ques.DataNotFound,data:null});      //response to client
            }
          })
        }
      })
  } else {
    demo.find({email : req.body.email},(err,da) => {
            //console.log(da);
            if(da.length > 0) {
              logger.info(staticconfig.ques.DataFound);   //making logs
               res.json({status:true,message:staticconfig.ques.DataFound,data:da[0].questions});    //response to client
            } else if(err) {
              logger.info(staticconfig.ques.DataNotFound);   //making logs
              res.json({status:false,message:staticconfig.ques.DataNotFound,data:null});      //repsonse to client
            }
          })
  }
  
 
});
module.exports = router;
