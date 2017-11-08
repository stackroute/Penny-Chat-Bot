let express = require('express');
let router = express.Router();
let demo=require('../../model/questionbank_schema');

router.post('/', function(req, res) {
  
  demo.find((err,data)=> {
    
    if(data.length === 0) {
      
      demo.insertMany({questions : [{question : req.body.question}]},(err,data)=> {
        if(err) {
          res.send(err);
        } else {
          res.json({data:data});
        }
      })
    } else {
      
      demo.update({},{$addToSet : {questions : req.body}},(err,data)=>{
        if(err)
        {
          
          res.json({status:false,message:"Error",data:null});
        }
        else if(data==undefined){
          res.json({status:false,message:"Data not found",data:null});
        }
        else{
          res.json({status:true,message:"Sucess",data:data});
        }
      })
    }
  })
})

module.exports = router;
