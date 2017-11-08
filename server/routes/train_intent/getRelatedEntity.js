let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

export default (req, res)=> {
  var finaloutput=[];
  
  const resultPromise = session.run(
    "match (n:"+ req.body.intentName.label +" {name:'"+req.body.intentName.itemName+"'})-[]-(m) return n,m"
    );
  resultPromise.then(result => {
    session.close();
    for(var i in result.records)
    {
      var output=result.records[i];
      
      finaloutput.push(output._fields[1].properties.name); 
    }

    res.json(finaloutput);
    
    // on application exit:
    driver.close();
  });
};