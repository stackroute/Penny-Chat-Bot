
let express = require('express');
let router = express.Router();
let demo=require('../../model/register_schema');
import staticconfig from './staticconfig';

router.post('/', function(req, res) {
  console.log("sdddddddjjjjjjjjjjjdjjdjdjdj",req.body.question);
  let data = req.body.question;
  if(data != undefined) {
    demo.update({email : req.body.email},
      {$addToSet : {questions : data}},(err,data)=>{
        if(err)
        {
          res.json({status:false,message:staticconfig.ques.DataNotFound,data:null});
        } else {
          demo.find({email : req.body.email},(err,da) => {
            //console.log(da);
            if(da.length > 0) {
               res.json({status:true,message:staticconfig.ques.DataFound,data:da[0].questions});
            } else if(err) {
              res.json({status:false,message:staticconfig.ques.DataNotFound,data:null});
            }
          })
        }
      })
  } else {
    demo.find({email : req.body.email},(err,da) => {
            //console.log(da);
            if(da.length > 0) {
               res.json({status:true,message:staticconfig.ques.DataFound,data:da[0].questions});
            } else if(err) {
              res.json({status:false,message:staticconfig.ques.DataNotFound,data:null});
            }
          })
  }
  
 
});
module.exports = router;
