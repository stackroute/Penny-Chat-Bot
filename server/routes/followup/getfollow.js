import express from 'express'; // File for messages
import logger from '../../log4js';
import flow_schema from './../../model/flow_schema';

export default (req,res)=>{
	//add_task.insertOne({taskname : req.body.message[0].TaskName , data : req.body.message },(error,data)=>{
flow_schema.find((error,data)=>{
		if(data.length > 0){
			res.json(data);
		} else {
			res.json([]);
		}
	})

}