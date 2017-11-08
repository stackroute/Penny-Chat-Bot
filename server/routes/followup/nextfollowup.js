import express from 'express';
import task from './task';
import yesno from './yesno';
import flow_schema from './../../model/flow_schema';

let checkanswer = (answer, question) => {
	let result;
	let set = false;
	console.log("==============szdvssafdv============sadv",answer);
	if(question.answertype == "Yes/No") {
		yesno.map((data) => {
			data.value.map((main) => {
				if(main == answer) {
					console.log("++++ ",data.type);
					result = data.type;
					set = true;
				}
			})
		})
		
		if(question.genre != "Question") {
			if(!set) {
			// return false;
			console.log("=========Negative===========");
			} else { 
				if(result) {
					return "Yes"
				} else {
					console.log("00000000000");
					return "No"
				}
			}
		} else {
			if(!set) {
				return false;
			} else {
				return true;
			}
		}
	} else if(question.answertype == "MCQ") {
		let length = question.option.length;
		if(answer <= length) {
			return true;
		} else {
			return false;
		}
	}
}


export default (req,res) => {
let validity;
if(req.body.question.type == 'Q') {
flow_schema.find({task : req.body.countertype},(error,data)=>{
		if(data.length > 0){
			validity = checkanswer(req.body.answer,req.body.question);
			if(req.body.question.genre != "Question") {
				flow_schema.find({task : req.body.countertype},{question : {$elemMatch : { id : req.body.question.id, answer : validity}}},(err,datamain)=> {
					if(datamain.length > 0) {
						console.log(datamain);
						res.json(datamain[0].question[0]);
					}
				})
			} else {
				if(!validity) {
					flow_schema.find({task : req.body.countertype},{question : {$elemMatch : { id : req.body.question.id, answer : validity}}},(err,datamain)=> {
					if(datamain.length > 0) {
						console.log(datamain);
						res.json(datamain[0].question[0]);
					}
				})
				} else {
					let next;
					flow_schema.find({task : req.body.countertype},{question : {$elemMatch : { id : req.body.question.id, answer : validity, input : req.body.answer}}},(err,datamain)=> {
					if(datamain.length > 0) {
						console.log(datamain[0].question[0].next);
						next = datamain[0].question[0].next;
					}
					if(next) {
						flow_schema.find({task : req.body.countertype},{question : {$elemMatch : { id : next, type : "Q"}}},(err,datamain)=> {
							if(datamain.length > 0) {
								console.log(datamain);
								res.json(datamain[0].question[0]);
							}
						})
					}
				})
				}
				//console.log("-----------svd-------------------- ",req.body.question);
			}
		}
		else{
			res.send({'error' : error })
		}

	})

} else {
	console.log("--------------------------------svd-------------------- ",req.body.question);
	flow_schema.find({task : req.body.countertype},{question : {$elemMatch : { id : req.body.question.next, type : "Q"}}},(err,datamain)=> {
					if(datamain.length > 0) {
						console.log(datamain);
						res.json(datamain[0].question[0]);
					}
				})
}

}



	//res.json(req.body.counter);
// 	let sendresponse = (main) => {
// 		res.json({question : main});
// 	}

// 	let checkyesno = () => {
// 		let value;
// 		yesno.map((data) => {
// 			data.value.map((da) => {
// 				if(da == req.body.answer) {
// 					value = data.type;
// 				}
// 			})
// 		})
// 		return value;
// 	}

// 	let followyesno = (mainques) => {
// 		let result = checkyesno();
// 		let main;
// 		console.log("folowww", question);
// 		let res = question.map((data) => {
// 			if(data.id == mainques.id && data.answer == result) {
// 				main = data;
// 			}
// 		})
// 		let next;
// 		question.map((data) => {
// 			if(data.id == main.next) {
// 				next = data;
// 			}
// 		})
// 		console.log(main,"insededseds")
// 	sendresponse(main);
// 	}

// 	let follownum = (mainques) => {
// 		let main;
// 		if(!isNaN(req.body.answer)) {
// 			console.log("itsssssssssssssssssssssssss a inttttttttttttttt");
// 			let res = question.map((data) => {
// 				if(data.id == mainques.id && data.answer == true) {
// 				main = data;
// 			}
// 			})
// 			sendresponse(main);
// 		} else {
// 			console.log("itsssssssssssssssssssssssss notttttttttttt a inttttttttttttttt");
// 			let res = question.map((data) => {
// 				if(data.id == mainques.id && data.answer == false) {
// 				main = data;
// 			}
// 			})
// 			sendresponse(main);
// 		}
// 	}

// 	let followvalue = (mainques,n) => {
// 		let main;
// 		let answer = req.body.answer;
// 		answer = answer.toLowerCase();
// 		console.log("========================hsadfjah=========",answer);
// 		if(answer >= 0 && answer <=8 && mainques.answertype=="NUM8") {
// 			console.log("itsssssssssssssssssssssssss a NUM8 inttttttttttttttt");
// 			let res = question.map((data) => {
// 				if(data.id == mainques.id && data.answer == true) {
// 				main = data;
// 			}
// 			})
// 			sendresponse(main);
// 		} else if(answer >= 0 && answer <=10 && mainques.answertype=="NUM10") {
// 			console.log("itsssssssssssssssssssssssss a NUM!10ttttttttttt");
// 			let res = question.map((data) => {
// 				if(data.id == mainques.id && data.answer == true) {
// 				main = data;
// 			}
// 			})
// 			sendresponse(main);
// 		} else if((answer == 'a' || answer == 'b' || answer == 'c') && mainques.answertype=="ABC") {
// 			console.log("itsssssssssssssssssssssssss a  ABC inttttttttttttttt");
// 			let res = question.map((data) => {
// 				if(data.id == mainques.id && data.answer == true) {
// 				main = data;
// 			}
// 			})
// 			sendresponse(main);
// 		} else if((answer == 'a' || answer == 'b' || answer == 'c' || answer == 'd') && mainques.answertype=="ABCD") {
// 			console.log("itsssssssssssssssssssssssss a ABCD inttttttttttttttt");
// 			let res = question.map((data) => {
// 				if(data.id == mainques.id && data.answer == true) {
// 				main = data;
// 			}
// 			})
// 			sendresponse(main);
// 		} else if((answer == 'a' || answer == 'b' || answer == 'c' || answer == 'd' || answer == 'e') && mainques.answertype=="ABCDE") {
// 			console.log("itsssssssssssssssssssssssss a ABCDE inttttttttttttttt");
// 			let res = question.map((data) => {
// 				if(data.id == mainques.id && data.answer == true) {
// 				main = data;
// 			}
// 			})
// 			sendresponse(main);
// 		} else  {
// 			console.log("itsssssssssssssssssssssssss notttttttttttt a inttttttttttttttt");
// 			let res = question.map((data) => {
// 				if(data.id == mainques.id && data.answer == false) {
// 				main = data;
// 			}
// 			})
// 			sendresponse(main);
// 		}
// 	}

// 	let checkanswer = (mainques) => {
// 		console.log("ynnnyyyynnnnyyyynnn")
// 		if(mainques.answertype == 'Y/N') {
// 			console.log("here check");
// 			followyesno(mainques);
// 		}
// 		else if(mainques.answertype == 'NUM') {
// 			console.log("here check 2",mainques);
// 			follownum(mainques);
// 		} else if(mainques.answertype == 'NUM8') {

// 			followvalue(mainques,"NUM8");
// 		} else if(mainques.answertype == "NUM10") {
// 			followvalue(mainques,"NUM10");
// 		} else if(mainques.answertype == "ABC") {
// 			followvalue(mainques,"ABC");
// 		} else if(mainques.answertype == "ABCD") {
// 			followvalue(mainques,"ABCD");
// 		} else if(mainques.answertype == "ABCDE") {
// 			followvalue(mainques,"ABCDE");
// 		} 
// 	}

// 	console.log(req.body,"---------------------req.body");
// 	let questionbank = task.find((data)=> {
// 		if(data.task == req.body.countertype) {
// 			return data.question;
// 		}
// 	})

// 	//console.log("akdsfncakjsdfnkjasdfkj",questionbank);
// 	let question = questionbank.question.filter((data) => {
// 		if(!req.body.question.next) {
// 			if(data.id == req.body.question.id) {
// 			return data;
// 		}
// 		}
// 		else {
// 		if(data.id == req.body.question.next) {
// 			return data;
// 		}	
// 		}
// 	})

// console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",question);
// console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",req.body.question);
// 	if(req.body.question.type == "Q") {
// 		console.log("ppppppppppppppp");
// 		checkanswer(req.body.question);
// 	}
// 	else {
// 		let nextquest = question.filter((data) => {
// 			if(data.id == req.body.question.next && data.type == "Q") {
// 				return data;
// 			}
// 		})
// 		console.log("llllllllllllllllll",nextquest);
// 		if(nextquest[0].type == "Q") {
// 			//checkanswer(nextquest[0]);
// 			sendresponse(nextquest[0]);
// 		}
// 		else {
// 			checkanswer(nextquest[0]);
// 		}
// 	}
// 	// res.json(question);
