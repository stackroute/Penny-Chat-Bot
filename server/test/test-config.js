module.exports = {

	forgotpassword:{
		findyield:{
			"_id" : "59c20a8090862e01a0c96034",
			"name" : "shagun",
			"username" : "shagun",
			"contact_no" : 2983472343,
			"email" : "shagunsankla61@gmail.com",
			"password" : "jasmine9",
			"type" : "User",
			"status" : true,
			"policy" : [ ]},
			sendyield:{email : "shagunsankla61@gmail.com"}
		},
		warningfindresponse:{
			_id:'59c393d31f0a19213741e83e',
			name:'Shivam',
			username:'shivam7',
			contact_no:8922861748,
			email:'stshivam@gmail.com',
			password:'123@g',
			status:false,
			type:'user',
			policy : []
		},

		warningUpdateresponse:
		{
			status:true,message : "Success Added",data:{ ok: 1, nModified: 1, n: 1 } 
		},

		setpassword : {     
			positiveSetpasswordfind:
			{
				status:true,
				message : "Success Added",
				data: {
					name : "naman",
					username: "naman",
					contact_no : 6787678987,
					email : "naman@gmail.com",
					password : "naman@26",
					type: "User",
					status : true,
					policy : [ ]
				}
			},
			positiveSetpasswordupdate:
			{
				status:true
			},
			negativeSetpasswordupdate:
			{
				status:true,message : "Success Added", 
				data: {
					name : "naman",
					username: "naman",
					contact_no : 6787678987,
					email : "naman@gmail.com",
					password : "naman@26",
					type: "User",
					status : true,
					policy : [ ]
				}
			}

			},
				verifyuser:{
findyield:{
	_id:'59c393d31f0a19213741e83e',
	name:'Shivam',
	username:'shivam7',
	contact_no:8922861748,
	email:'stshivam@gmail.com',
	password:'123@g',
	status:false,
	type:'user',
	policy : []
},
updateyield:{
	status:true,message : "Success Added",data:{ ok: 1, nModified: 1, n: 1 } 
},
findyield2:{
	_id:'59c393d31f0a19213741e83e',
	name:'Shivam',
	username:'shivam7',
	contact_no:8922861748,
	email:'stshivam@gmail.com',
	password:'123@g',
	status:true,
	type:'user',
	policy : []
}
},
signin:{
sendyield:{"email": "user_test@example.com", "password" : "12345"},
findyield:{
    name : 'abhishek',
    username : 'abhi',
    contact_no : '1234567890',
    email:"abkills2@gmail.com",
    password:"1234",
    status : true,
    type : 'user',
    policy : []
},
signinstubyield:{"email": "user_test@example.com", "password" : "$2a$10$GzYKtCErFPW1DSpFDjTd2.DQXKjPwEhPbBuW3lTWZ/qzpJDgHexCi"}
},
registertestsend:{"email":"stshivam@gmail.com", "password":"12345"},

		

		}


