import express from 'express'; // File for messages
import logger from '../../log4js';
import add_task from './../../model/add_task';
import staticconfig  from './staticconfig';
export default (req,res)=>{
	add_task.update({taskname : req.body.message[0].TaskName},
		{$addToSet :{data : req.body.message}},{upsert:true},
		(error,data)=>{
		if(data){//If data found
			res.json({status:true,message:staticconfig.addtask.DataFound,data : data})
		}
		else if(data==undefined){//if data is undefined
		res.json({status:false,message:staticconfig.addtask.DataNull,data :null })
		}
		else{//If data not found
			res.json({status:false,message:staticconfig.addtask.DataNotFound,'error' : error })
		}

	})

}