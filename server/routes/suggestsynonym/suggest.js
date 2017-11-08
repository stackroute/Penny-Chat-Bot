const express = require('express');
const neo4j = require('neo4j-driver').v1;
import staticconfig  from './staticconfig';
import config from '../../config/config';

const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

const natural =require('natural');
let router = express.Router();

export default (req, res, next)=>{
  let wordnet = new natural.WordNet();
  let word=req.body.data.word;
    wordnet.lookup(word, (results)=> { //Search for the word entered by the user
      results.forEach((result) =>{
      });
      if(results[0]!=undefined){ //When synonym is found
       res.json({status:true,message:staticconfig.suggest.SynonymFound,data : results[0].synonyms});    
     }
      else{   //When synonym is not found
       res.json({status:false,message:staticconfig.suggest.SynonymNotFound,data:null});
     }
   });    
  };