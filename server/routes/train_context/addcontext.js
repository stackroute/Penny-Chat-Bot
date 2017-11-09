let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;

import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();
import createSynonym from './createSynonym';
import createlink from './createlink';
import staticconfig  from './staticconfig'; //config file
import addflowcontext from './addflowContext';

export default(req, res)=>{

	req.body.context.name = req.body.context.name.toLowerCase();

	/*-========================If Domain===========================*/
	if(req.body.selectedContext.label != "") {
		if(req.body.selectedContext.label == staticconfig.domain.domain) {
			const resultPromise = session.run(
				'match(a: '+req.body.selectedContext.label+' {name : "'+req.body.selectedContext.name+'"}) merge(a)-[:type]->(b:SubDomain {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
				);
			resultPromise.then(result => {
				session.close();
				createSynonym(req.body);
				addflowcontext()
				res.json({status : true, result : result.records[0]})
				driver.close();
			});
		}

		/*===================If SubDomain===================*/
		else if(req.body.selectedContext.label == staticconfig.subdomain.subdomain) {
			const resultPromise = session.run(
				'match(a:'+req.body.selectedContext.label+'{name : "'+req.body.selectedContext.name+'"}) merge(a)-[:type]->(b:Entity {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
				);
			resultPromise.then(result => {
				session.close();
				createSynonym(req.body)
				res.json({status : true, result : result.records[0]})
				driver.close();
			});
		}

		/*=================If Entity======================*/
		else if(req.body.selectedContext.label ==staticconfig.entity.entity) {

			const resultPromise = session.run(
				'match(a:'+req.body.selectedContext.label+'{name : "'+req.body.selectedContext.name+'"}) merge(a)-[:type]->(b:SubEntity {name :"'+req.body.context.name+'", value :"'+req.body.context.name+'"}) return b'
				);
			resultPromise.then(result => {
				session.close();
				createSynonym(req.body)
				res.json({status : true, result : result.records[0]})
				driver.close();
			});
		}
	}

/*====================If any other Context=======================*/
	else {
		const resultPromise = session.run(
			'merge(a:Domain {name :"'+req.body.context.name+'"}) return a'
			);
		resultPromise.then(result => {
			session.close();
			createSynonym(req.body)
		  res.json({status : true, result : result.records[0]})
		  driver.close();
		});
	}
}
