const express = require('express');
const fs = require('fs');
const router = express.Router();
var unfurl = require('unfurled')

export default (req,res) => {   
	console.log(req.body.message);
	(async function () {
		let result = await unfurl(req.body.message)
		
		res.json(result)
	})().catch(console.error)

};
