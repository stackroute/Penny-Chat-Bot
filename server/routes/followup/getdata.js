import express from 'express'; // File for messages
import logger from '../../log4js';
import flow_schema from './../../model/flow_schema';

export default (req,res)=>{
	
flow_schema.findOne({task : req.params.name},(error,data)=>{
	
		res.json(data);
	})

}