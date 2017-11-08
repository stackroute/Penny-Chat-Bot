let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

export default (req, res)=> {
	
	const resultPromise = session.run(
		"match (n:"+req.body.context.label+"{name:'"+req.body.context.itemName+"'}) create (k:Synonym{name:'"+req.body.word+"'})-[:SameAs]->(n) return n,k"
		);
	resultPromise.then(result => {
		session.close();
		res.json(result.records);
	  // on application exit:
	  driver.close();
	});
};