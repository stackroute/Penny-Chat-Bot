const express = require('express');
const fs = require('fs');
const router = express.Router();
var unfurl = require('unfurled')
import staticconfig  from './Config';
import logger from '../../log4js';

export default (req,res) => {   
	
	// (async function () {
	// 	let result = await unfurl(req.body.message)
		
	// 	res.json(result)
	// })().catch(console.error)
	let main = [];
	let temp = 0;
	let comp = req.body.message.length;
	req.body.message.map((data) => {
		let result = unfurl(data);
		result.then((data) =>{
			temp++;
			main.push(data);
			if(temp == comp) {
				setoutput();
			}
		})
	})

	let setoutput = () => {

		res.json(main);
	}
}
