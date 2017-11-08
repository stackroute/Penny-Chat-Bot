let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import staticconfig  from './staticconfig'; //config file

var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));
const session = driver.session();
export default (req, res)=> {
  req.body.syn.syn.map((data)=>{
    const resultPromise = session.run(
      " match (a:Synonym {name:'"+data+"'}),(b:Intent {name:'"+req.body.intent_name+"',meaning:'"+req.body.intent_meaning+"'}) create (a)-[:SameAs]->(b) return a,b"
      );
    resultPromise.then(result => {
      session.close();
      res.json({status:true,message:staticconfig.addrelation.datafound,data:result});
  // on application exit:
  driver.close();
});
  })
  
};


