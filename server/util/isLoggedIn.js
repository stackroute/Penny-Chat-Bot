module.exports =function(req, res, next){

	if (req.isAuthenticated())
	{
		console.log("Authenticated");
		return next();
	}
	else
	{
	   res.send({status: false; message: 'Not Authenticated User'});
	}
};
