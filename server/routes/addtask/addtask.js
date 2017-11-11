import express from 'express'; // File for messages
import logger from '../../log4js';
import add_task from './../../model/add_task';
import staticconfig  from './Config';
export default (req,res)=>{
	add_task.update({taskname : req.body.message[0].TaskName},
		{$addToSet :{data : req.body.message}},{upsert:true},
		(error,data)=>{
		if(data){//If data found
			logger.info(staticconfig.addtask.DataFound)    //making logs
			res.json({status:true,message:staticconfig.addtask.DataFound,data : data})		//response to client
		}
		else if(data==undefined){//if data is undefined
			logger.info(staticconfig.addtask.DataNull)    //making logs
		res.json({status:false,message:staticconfig.addtask.DataNull,data :null })		//response to client
		}
		else{//If data not found
			logger.info(staticconfig.addtask.DataNotFound)    //making logs
			res.json({status:false,message:staticconfig.addtask.DataNotFound,'error' : error })		//response to client
		}

	})

}