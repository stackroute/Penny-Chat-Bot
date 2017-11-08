
let express = require('express');
let router = express.Router();
let demo=require('../../model/register_schema');
import staticconfig from './staticconfig';

router.post('/', function(req, res) {
  
  let data = req.body.question;
  data.map((chat) => {
    
    demo.update({email : req.body.email},
      {$addToSet : {questions : chat}},(err,data)=>{
        if(err)
        {
          
          res.json({status:false,message:staticconfig.ques.DataNotFound,data:null});
        }
      })
  });
  
  res.json({status:true,message:staticconfig.ques.DataFound,data:data});
});
module.exports = router;
