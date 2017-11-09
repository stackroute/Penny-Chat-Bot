let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session(); //config file


export default(object,label)=>{
	/*======================Query to add flow to context===========================*/

	object.completeContext.map((intent) =>{
		if(intent.flow) {
			const resultPromise = session.run("MATCH (ee:"+label+") where ee.name ='"+object.context.name+"' MATCH (ee)-[:"+intent.name+"]->(xx) CREATE (ff:Counter {name : '"+intent.flow+"', value : '"+intent.flow+"'}), (xx)-[:answer]->(ff) return ee,ff,xx");
		resultPromise.then(result => {
		//session.close();
		//closins session
		//res.json({status : true, result : result.records[0]})
		console.log(result);
		//driver.close();
		//closing driver
	});
	}
	});
	//session.close();
};