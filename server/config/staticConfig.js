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

  updateUserdata : {
 errorMessage : "Error in access",
 successMessage : "Success in update User",
 user : 'User',
 admin : 'Admin'
},
reset_password: {
    UserNotFindMessage:"username does not exist",
    OldPasswordNotMatch:"old password doesnot match",
    UpdatePasswordError: "password is not updated",
    successMessage : "Successfully done"
  }
}