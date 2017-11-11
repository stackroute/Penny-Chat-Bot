let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import staticConfig from './Config';
import config from '../../config/config';
import logger from '../../log4js';
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

export default (req, res)=> {

const resultPromise = session.run(

"match (n:"+req.body.context.label+" {name:'"+req.body.context.itemName+"'})<-[:SameAs]-(x:Synonym {name:'"+req.body.synonym.properties.name+"'}) detach delete x return x"

);
resultPromise.then(result => {
  session.close();
  	logger.info(staticConfig.editDeleteSynonym.messageSuccess)    //making logs
    res.json(result.records);
  // on application exit:
  driver.close();
});
};