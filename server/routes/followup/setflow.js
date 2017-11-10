import express from 'express'; // File for messages
import logger from '../../log4js';
import flow_schema from './../../model/flow_schema';

export default (req,res)=>{
flow_schema.insertMany(req.body,{upsert:true},(error,data)=>{
		if(data==undefined){
			res.json({status:false,message:"Data Undefined",data : null });			
		}
		else if(data){
			res.json({status:true,message:"Data Found",data : data});
		}
		else{
			res.json({status:false,message:"Error in inserting",'error' : error });
		}
	})
}