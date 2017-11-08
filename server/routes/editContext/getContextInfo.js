let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;

import config from '../../config/config';
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

/*==============================getContext Information==============================*/
export default (req, res)=> {
	
	const resultPromise = session.run(
		"match (n:"+req.body.context.label+" {name:'"+req.body.context.itemName+"'})-[:"+req.body.intent.itemName+"]->(x) return x"
		);
	resultPromise.then(result => {
		let intentData = result.records[0]._fields[0].properties;
		const resultPromise = session.run(
			"match (n:"+req.body.context.label+" {name:'"+req.body.context.itemName+"'})-[:"+req.body.intent.itemName+"]->(x)-[:answer]->(y) return y"
			)
		resultPromise.then(result => {
  		res.json({status : true, intentData : intentData, answerLinks : result.records});
  		driver.close();// driver close here
  	})
  // on application exit:
});
};