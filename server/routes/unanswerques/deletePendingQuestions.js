let express = require('express');
let router = express.Router();
let demo=require('../../model/questionbank_schema');
import staticConfig from './staticconfig' ;

export default (req, res) => {
  
  demo.update({},{$pull : {questions :{question: req.body.ques}}},
    {multi:true},(err,data)=>{
      if(err)
      {        //Error
        res.json({status:false,message:staticConfig.deletependingques.Error,data:null});
      }
      else if(data==undefined){
        //data not found
        res.json({status:false,message:staticConfig.deletependingques.DataNotFound,data:null});
      }
      else{  
      //data found     
        res.json({status:true,message:staticConfig.deletependingques.DataFound,data:data});
      }
    })
}