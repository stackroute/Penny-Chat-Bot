let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();

export default (req, res)=> {
	var finaloutput=[];
	
	const resultPromise = session.run(
		"MATCH (a:"+req.body.data.label+" {name:'"+req.body.data.itemName+"'}) detach delete a"
		);
	resultPromise.then(result => {
		session.close();
		res.json({status:true,message:"Successfully Deleted",data:result});		
	  // on application exit:
	  driver.close();
	});
};