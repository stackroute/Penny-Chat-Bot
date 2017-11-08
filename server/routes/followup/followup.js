import express from 'express'; // File for messages
import logger from '../../log4js';
import flow_schema from './../../model/flow_schema';

export default (req,res)=>{
		
flow_schema.find({task : req.body.counter},(error,data)=>{
		if(data.length > 0){
			
			let main;
			data[0].question.map((data) => {
				if(data.genre == "Introduction") {
					main = data;
				}
			})
			res.json(main);
		}
		else{
			res.json({'error' : error })
		}

	})

}