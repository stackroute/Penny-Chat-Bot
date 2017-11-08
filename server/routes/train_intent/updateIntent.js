/*let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", "shivam20"));
const session = driver.session();

 export default (req, res)=>{
 	console.log('hello',req.body)
const resultPromise = session.run(

 "MATCH (ab {type:'"+req.body.type+"', value:'"+req.body.value+"' }) where ab.type=SET ab.value = '"+req.body.value"' RETURN ab"
);
resultPromise.then(result => {
  session.close();
  console.log("oyaaaa",result.records[0]._fields)
    res.json(result.records[0]);
  // on application exit:
  driver.close();
});
};*/