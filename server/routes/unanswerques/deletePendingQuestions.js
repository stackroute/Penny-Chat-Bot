let express = require('express');
let router = express.Router();
let demo=require('../../model/questionbank_schema');

export default (req, res) => {
  
  demo.update({},{$pull : {questions :{question: req.body.ques}}},
    {multi:true},(err,data)=>{
      if(err)
      {        
        res.json({status:false,message:"Error Found",data:null});
      }
      else if(data==undefined){
        res.json({status:false,message:"Data not found",data:null});
      }
      else{       
        res.json({status:true,message:"Data found",data:data});
      }
    })
}