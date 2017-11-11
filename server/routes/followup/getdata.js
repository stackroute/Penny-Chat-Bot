import express from 'express'; // File for messages
import logger from '../../log4js';
import flow_schema from './../../model/flow_schema';
import staticConfig from './Config';

export default (req,res)=>{
	
flow_schema.findOne({task : req.params.name},(error,data)=>{
		logger.info(staticConfig.getdata.message)		//making logs
		res.json(data);				//response to client
	})

}