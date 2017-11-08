let express = require('express');
let router = express.Router();
import staticconfig  from './staticconfig';
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config'; 

var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

export default (req, res)=> {
  req.body.syn.map((data)=>{
    const resultPromise = session.run(
      "create (a:Synonym {name:'"+data+"'}) return a"  
      );
    resultPromise.then(result => {
      session.close();
      res.json({status:true,message:staticconfig.addsyn.datafound,data:result.records[0]});
  // on application exit:
  driver.close();
});
  })
};