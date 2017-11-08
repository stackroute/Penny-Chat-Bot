import express from 'express'; // File for messages
import logger from '../../log4js';
import flow_schema from './../../model/flow_schema';

export default (req,res)=>{
	console.log('=========',req.body);

	//add_task.insertOne({taskname : req.body.message[0].TaskName , data : req.body.message },(error,data)=>{
flow_schema.insertMany(req.body,{upsert:true},(error,data)=>{
		if(data){
			console.log("---------------------------------------------------");
			console.log(data);
			res.json({data : data})
		}
		else{
			res.send({'error' : error })
		}

	})

}