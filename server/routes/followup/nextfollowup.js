import express from 'express';
import task from './task';
import yesno from './yesno';
import flow_schema from './../../model/flow_schema';

let checkanswer = (answer, question) => {
  let result;
  let set = false;
  
  if(question.answertype == "Yes/No") {
    yesno.map((data) => {
      data.value.map((main) => {
        if(main == answer) {
          
          result = data.type;
          set = true;
        }
      })
    })
    
    if(question.genre != "Question") {
      if(!set) {
        
      } else { 
        if(result) {
          return "Yes"
        } else {
          
          return "No"
        }
      }
    } else {
      if(!set) {
        return false;
      } else {
        return true;
      }
    }
  } else if(question.answertype == "MCQ") {
    let length = question.option.length;
    if(answer <= length) {
      return true;
    } else {
      return false;
    }
  }
}


export default (req,res) => {
  let validity;
  if(req.body.question.type == 'Q') {
    flow_schema.find({task : req.body.countertype},(error,data)=>{
      if(data.length > 0){
        validity = checkanswer(req.body.answer,req.body.question);
        if(req.body.question.genre != "Question") {
          flow_schema.find({task : req.body.countertype},{question : {$elemMatch : { id : req.body.question.id, answer : validity}}},(err,datamain)=> {
            if(datamain.length > 0) {
              
              res.json(datamain[0].question[0]);
            }
          })
        } else {
          if(!validity) {
            flow_schema.find({task : req.body.countertype},{question : {$elemMatch : { id : req.body.question.id, answer : validity}}},(err,datamain)=> {
              if(datamain.length > 0) {
                
                res.json(datamain[0].question[0]);
              }
            })
          } else {
            let next;
            flow_schema.find({task : req.body.countertype},{question : {$elemMatch : { id : req.body.question.id, answer : validity, input : req.body.answer}}},(err,datamain)=> {
              if(datamain.length > 0) {
                
                next = datamain[0].question[0].next;
              }
              if(next) {
                flow_schema.find({task : req.body.countertype},{question : {$elemMatch : { id : next, type : "Q"}}},(err,datamain)=> {
                  if(datamain.length > 0) {
                    
                    res.json(datamain[0].question[0]);
                  }
                })
              }
            })
          }
        }
      }
      else{
        res.send({'error' : error })
      }

    })

  } else {
    
    flow_schema.find({task : req.body.countertype},{question : {$elemMatch : { id : req.body.question.next, type : "Q"}}},(err,datamain)=> {
      if(datamain.length > 0) {
        
        res.json(datamain[0].question[0]);
      }
    })
  }

}


