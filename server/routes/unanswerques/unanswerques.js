let express = require('express');
let router = express.Router();
let demo=require('../../model/questionbank_schema');

export default (req,res)=>{
  demo.find({},(err,data)=>{
    if(err){
      return res.json(err);
    }
    else{
      
      res.json(data);
    }
  })
};
