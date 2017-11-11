const express = require('express');
const fs = require('fs');
const router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
import staticconfig  from './Config';
const uri = config.neo4jUrl;
const driver = neo4j.driver(uri,neo4j.auth.basic("neo4j",config.neo4jurlpassword));

const session = driver.session();

export default (req, res)=> {
  const resultPromise = session.run(        //Query to fetch property name from neo4j database
    "MATCH (n) WHERE NOT n:Attribute AND NOT n:Intent AND NOT n:SubIntent return n"
    );
  resultPromise.then(result => {
    session.close();
    let main = [];

    let data=result.records.map((data)=>data._fields[0].properties.name);
    
    data.map((d) => {
      let flag = 0;
      main.map((m) => {
        if(m == d) {
          flag++;
        }
      })
      if(flag==0) {
        main.push(d);
      }
    })
    
    let file = fs.createWriteStream('./dataset.json');
    file.on('error', (err)=> {
      console.log("Error in writing");             /* error handling */
    }); 
    file.write(JSON.stringify( main,null,2));
    file.end();
    // on application exit:
    driver.close();
    res.json({status:true,message:staticconfig.getdata.Label,data:main});
  });
};
