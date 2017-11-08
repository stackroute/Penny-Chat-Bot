import express from 'express'; // File for messages
import logger from '../../log4js';
import flow_schema from './../../model/flow_schema';

export default (req,res)=>{
	console.log('=========',req.body);

	//add_task.insertOne({taskname : req.body.message[0].TaskName , data : req.body.message },(error,data)=>{
flow_schema.find({task : req.body.counter},(error,data)=>{
		if(data.length > 0){
			console.log("---------------------------------------------------");
			let main;
			data[0].question.map((data) => {
				if(data.genre == "Introduction") {
					main = data;
				}
			})
			res.json(main);
		}
		else{
			res.send({'error' : error })
		}

	})

}