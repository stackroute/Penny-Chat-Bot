let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;

import config from '../../config/config';
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

export default (req, res)=> {
	console.log('khusbooooo')
	console.log('synonym..',req.body.synonym.properties.name);
	console.log('body..',req.body.context);
	//console.log('body..',req.body.context.labels[0],req.body.context.itemName);
const resultPromise = session.run(

"match (n:"+req.body.context.label+" {name:'"+req.body.context.itemName+"'})<-[:SameAs]-(x:Synonym {name:'"+req.body.synonym.properties.name+"'}) detach delete x return x"

/*"match (n:"+req.body.label+" {name:'"+req.body.itemName+"'})-[*]-(x) where not (n)-[:type]-(x)-[*]-(x) return x"
*/);
resultPromise.then(result => {
  session.close();
  	console.log(result.records[0])
    res.json(result.records);
  // on application exit:
  driver.close();
});
};