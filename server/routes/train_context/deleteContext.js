let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();
import createSynonym from './createSynonym';
import createlink from './createlink';
import staticconfig  from './staticconfig'; //config file


export default(req, res)=>{
	/*======================Query to delete context===========================*/
	const resultPromise = session.run(
		'match(a:'+req.body.data.label+' {name : "'+req.body.data.itemName+'"}) detach delete a'
		);
	resultPromise.then(result => {
		session.close();
		//closins session
		res.json({status : true, result : result.records[0]})
		driver.close();
		//closing driver
	});
};