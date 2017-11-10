let express = require('express');
let router = express.Router();
let demo=require('../../model/questionbank_schema');
import staticConfig from './staticConfig' ;

router.post('/', function(req, res) {
  
  demo.find((err,data)=> {
    
    if(data.length === 0) {
      
      demo.insertMany({questions : [{question : req.body.question}]},(err,data)=> {
        if(err) {
          res.json(err);
        } else {
          res.json({data:data});
        }
      })
    } else {
      
      demo.update({},{$addToSet : {questions : req.body}},(err,data)=>{
        if(err)
        {
          //Error
          res.json({status:false,message:staticConfig.adminques.Error,data:null});
        }
        else if(data==undefined){
          //data not found
          res.json({status:false,message:staticConfig.adminques.DataNotFound,data:null});
        }
        else{
          res.json({status:true,message:staticConfig.adminques.Sucess,data:data});
        }
      })
    }
  })
})

module.exports = router;
