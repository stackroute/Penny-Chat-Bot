import config from './config';
export default {
	db:{
 mongoose_Connecting: "connecting to MongoDB...",
 mongoose_Error: "Error in MongoDb connection:",
 mongoose_Connected: 'MongoDB connected!',
 mongoose_Open: 'MongoDB connection opened!',
 mongoose_Reconnected:'MongoDB reconnected!',
 mongoose_Disconnected:'MongoDB disconnected!'
 },
	errorMessage:"Service Unavailable",
	 url : {
    failureRedirect : config.clientRedirectUrl,
    redirect : config.clientRedirectUrl+'/socialloginredirect'
  },
}