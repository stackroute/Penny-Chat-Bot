let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import config from '../../config/config';
var driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

import staticconfig  from './staticconfig'; //config file

/*=====================context intent domain and subIntent and answer creation ===================================================*/

export default (body) => {
	
	const session = driver.session();
	let video = staticconfig.video.video;
	let link = staticconfig.link.link;
	let subI = staticconfig.subintent.subintent;

	let completeContext = body.completeContext;

	completeContext.map((con) => {
		let videoLinkk=[];
		let videoLink=[];
		let blogLinkk=[];
		let blogLink=[];
		let subIntent=[];
		let vid;
		let blog;
		if(con.videoLink != undefined)
		{
			con.videoLink.map(video => {
				if(video!="")
					videoLinkk.push(video);
			})
		}

		if(con.blogLink != undefined)
		{
			
			con.blogLink.map(blog => {
				if(blog!="")
					blogLinkk.push(blog);
				
			})
		}

		if(con.subIntent != undefined){
			con.subIntent.map(subInt=>{
				if(subInt!=""){
					subIntent.push(subInt)
				}
			})
		}
		blogLink= blogLinkk.filter(function(n){ return n != undefined }); 
		videoLink= videoLinkk.filter(function(n){ return n != undefined }); 


		if((videoLink.length!=0)&&(blogLink.length!=0)&&(subIntent.length != 0) && (con.value!=""))
			{if(body.selectedContext.label != "") {
				if(body.selectedContext.label == staticconfig.domain.domain) {
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
						);
					resultPromise.then ((result) => {

						/*=============Querry for video link==============*/
						videoLink.map((vid)=>{
							const resultPromise = session.run(
								'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"})  return d,e');
							resultPromise.then((result) => {

								/*=================Querry for blog link=================*/
								blogLink.map((blog)=>{
									const resultPromise = session.run(
										'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:answer]-> (f:'+link+' {name : "link",value : "'+blog+'"}) return d,f');

									resultPromise.then((result) => {
										subIntent.map((subInt)=>{

											/*================Querry for subintent================*/
											const resultPromise = session.run(
												'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');

											resultPromise.then((result) => {
											})
										})
									})
								})
							})
						})
					})
				}

				/*==================If subdomain============*/
				else if(body.selectedContext.label == staticconfig.subdomain.subdomain) {
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})  return d'
						);
					resultPromise.then((result)=>{

						/*================Querry for videoLink================*/
						videoLink.map((vid)=>{           
							const resultPromise = session.run(
								'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"})  return d,e'
								);

							resultPromise.then((result) => {

								/*================Querry for subintent================*/
								blogLink.map((blog)=>{
									const resultPromise = session.run(
										'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d, f'
										);
									resultPromise.then((result) => {

										/*================Querry for subintent================*/
										subIntent.map((subInt)=>{
											const resultPromise = session.run(
												'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:'+subInt.name+']->(s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d, s'
												);
											resultPromise.then((result) => {

											})
										})
									})
								})
							})
						})
					})
				}


				/*=====================If Entity====================*/
				else if(body.selectedContext.label == staticconfig.entity.entity) {
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
						);
					resultPromise.then((result) => {

						/*================Querry for video links================*/
						videoLink.map((vid)=>{
							const resultPromise = session.run(
								'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})  merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"})  return d,e'
								);

							resultPromise.then((result) => {

								/*================Querry for blog link================*/				
								blogLink.map((blog)=>{
									const resultPromise = session.run(
										'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d,f'
										);
									resultPromise.then((result) => {

										/*================Querry for subintent================*/				
										subIntent.map((subInt)=>{
											const resultPromise = session.run(
												'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:'+subInt.name+']->(s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s'
												);
											resultPromise.then((result) => {
											})
										})
									})
								})
							})
						})
					})
				}
			}


			/*====================If any other context========================*/
			else {
				const resultPromise = session.run(
					'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
					);
				resultPromise.then((result)=>{

					/*================Querry for video link================*/
					videoLink.map((vid)=>{
						const resultPromise = session.run(
							'match (a:Domain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"})  return d,e'
							);

						resultPromise.then((result) => {

							/*================Querry for blog link================*/
							blogLink.map((blog)=>{
								const resultPromise = session.run(
									'match (a:Domain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d,f'
									);

								resultPromise.then((result) => {

									/*================Querry for subintent================*/
									subIntent.map((subInt)=>{
										const resultPromise = session.run(
											'match (a:Domain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:'+subInt.name+']->(s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s'
											);
										resultPromise.then((result) => {
										})
									})
								})
							})
						})
					})
				})
			}
		}
		

		/*=============================if context is undefined=====================================*/	



		/*============================if video link is undefined====================================*/

		if((videoLink.length==0)&&(blogLink.length!=0) && (subIntent.length!=0)&& (con.value!="")){
			if(body.selectedContext.label != "") {
				if(body.selectedContext.label == staticconfig.domain.domain) {

					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
						);

					resultPromise.then((result) => {

						/*================Querry for blog link================*/
						blogLink.map((blog)=>{
							const resultPromise = session.run(
								'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d,f'
								);

							resultPromise.then((result) => {

								/*================Querry for subintent================*/
								subIntent.map((subInt)=>{
									const resultPromise = session.run(
										'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');
									resultPromise.then((result) => {
									})
								})
							})
						})
					})
				}

		/*==============================If subdomain==================================*/
				else if(body.selectedContext.label == staticconfig.subdomain.subdomain) {
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
						);
					resultPromise.then((result) => {

						/*================Querry for blog link================*/		
						blogLink.map((blog)=>{
							const resultPromise = session.run(
								'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d,f'
								);

							resultPromise.then((result) => {

								/*================Querry for subintent================*/				
								subIntent.map((subInt)=>{
									const resultPromise = session.run(
										'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');
									resultPromise.then((result) => {
									})
								})
							})
						})
					})
				}

				/*=-==================If Entity=======================*/
				else if(body.selectedContext.label == staticconfig.entity.entity) {

					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
						);

					resultPromise.then((result) => {

						/*================Querry for blog links================*/				
						blogLink.map((blog)=>{
							const resultPromise = session.run(
								'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d,f'
								);

							resultPromise.then((result) => {

								/*================Querry for subintent================*/						
								subIntent.map((subInt)=>{
									const resultPromise = session.run(
										'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');

									resultPromise.then((result) => {
									})
								})
							})
						})
					})
				}
			}

		/*===========================If any other context============================*/	
		else {
			const resultPromise = session.run(
				'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);

			resultPromise.then((result) => {

				/*================Querry for blog links================*/			
				blogLink.map((blog)=>{
					const resultPromise = session.run(
						'match (a:Domain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d,f'
						);

					resultPromise.then((result) => {

						/*================Querry for subintent================*/						
						subIntent.map((subInt)=>{
							const resultPromise = session.run(
								'match (a:Domain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');
							resultPromise.then((result) => {
							})
						})
					})
				})
			})
		}}

			/*============================================if bloglink is undefined======================*/

			if((blogLink.length==0)&&(videoLink.length!=0)&&(subIntent.length!=0) && (con.value!="")){
				if(body.selectedContext.label != "") {
					if(body.selectedContext.label == staticconfig.domain.domain) {

						const resultPromise = session.run(
							'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
							);

						resultPromise.then((result) => {

							/*================Querry for video links================*/				
							videoLink.map((vid)=>{
								const resultPromise = session.run(
									'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"}) return d,e'
									);

								resultPromise.then((result) => {

									/*================Querry for subintent================*/							
									subIntent.map((subInt)=>{
										const resultPromise = session.run(
											'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');

										resultPromise.then((result) => {
										})
									})
								})
							})
						})
					}

		/*===========================If SubDomain====================*/
		else if(body.selectedContext.label == staticconfig.subdomain.subdomain) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result) => {

				/*================Querry for video links================*/				
				videoLink.map((vid)=>{

					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"}) return d,e'
						);

					resultPromise.then((result) => {

						/*================Querry for subintent================*/						
						subIntent.map((subInt)=>{
							const resultPromise = session.run(
								'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');

							resultPromise.then((result) => {
							})
						})
					})
				})
			})
		}


		/*===================If Entity=====================*/
		else if(body.selectedContext.label == staticconfig.subdomain.subdomain) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result) => {

				/*================Querry for video links================*/		
				videoLink.map((vid)=>{
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})  merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"}) return d,e'
						);

					resultPromise.then((result) => {

						/*================Querry for subintent================*/			
						subIntent.map((subInt)=>{
							const resultPromise = session.run(
								'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');

							resultPromise.then((result) => {
							})
						})
					})
				})
			})
		}
	}


	/*=======================If ant other context==============================*/
				else {
					const resultPromise = session.run(
						'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
						);

					resultPromise.then((result) => {

						/*================Querry for video links================*/		
						videoLink.map((vid)=>{
							const resultPromise = session.run(
								'match (a:Domain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})  merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"}) return d,e'
								);

							resultPromise.then((result) => {

								/*================Querry for subintent================*/			
								subIntent.map((subInt)=>{
									const resultPromise = session.run(
										'match (a:Domain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');

									resultPromise.then((result) => {
									})
								})
							})
						})
					})
				}
			}



/*================when videolink , subIntent and bloglink undefined==================*/


if((blogLink.length==0)&&(videoLink.length==0)&&(subIntent.length==0) && (con.value!="")){

	if(body.selectedContext.label != "") {
		if(body.selectedContext.label == staticconfig.domain.domain) {

			/*==============querry if context is domain=============*/
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result) => {
			})
		}

		/*=============if context is Subdomain===================*/
		else if(body.selectedContext.label == staticconfig.subdomain.subdomain) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result) => {
			})
		}

	/*==================if context is Entity=====================*/	
		else if(body.selectedContext.label == staticconfig.entity.entity) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result) => {
			})
		}
	}

	/*========================if conetxt if not defined============================*/
	else {
		const resultPromise = session.run(
			'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
			);
		resultPromise.then((result) => {
		})
	}}


/* =========when videoLink and blogLink are undefined but subIntent are defined ====================*/
if((blogLink.length==0)&&(videoLink.length==0) && (con.value!="") && (subIntent.length!=0)){
	if(body.selectedContext.label != "") {

		/*=================If Domain===============*/
		if(body.selectedContext.label == staticconfig.domain.domain) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);

			resultPromise.then((result) => {

				/*================Querry for subintent================*/	
				subIntent.map((subInt)=>{
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');

					resultPromise.then((result) => {
					})
				})
			})
		}


		/*==================If SubDomain==========================*/
		else if(body.selectedContext.label == staticconfig.subdomain.subdomain) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);

			resultPromise.then((result) => {

				/*================Querry for subintent================*/	
				subIntent.map((subInt)=>{
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');
					resultPromise.then((result) => {
					})
				})
			})
		}

	/*======================If Entity=========================*/
		else if(body.selectedContext.label == staticconfig.entity.entity) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);

			resultPromise.then((result) => {

				/*================Querry for subintent================*/	
				subIntent.map((subInt)=>{ 
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');
					resultPromise.then((result) => {
					})
				})
			})
		}
	}


	/*=====================If context is not defined========================*/
		else {
			const resultPromise = session.run(
				'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result) => {
				/*================Querry for subintent================*/	
				subIntent.map((subInt)=>{
					const resultPromise = session.run(
						'match (a:Domain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:'+subInt.name+']-> (s:Attribute {name : "'+subInt.name+'",value : "'+subInt.value+'"}) return d,s');
					resultPromise.then((result) => {
					})
				})
			})
		}
	}



/*================ when blogLink and videoLink are defined and subIntent are undefined ==================*/
if((videoLink.length!=0)&&(blogLink.length!=0)&&(con.value!="")&&(subIntent.length==0))
{   
	if(body.selectedContext.label != "") {
		/*===============If Domain==================*/
		if(body.selectedContext.label == staticconfig.domain.domain) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then ((result) => {
				/*================Querry for vidoe links================*/	
				videoLink.map((vid)=>{
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"})  return d,e');

					resultPromise.then((result) => {
						/*================Querry for blog links================*/			
						blogLink.map((blog)=>{
							const resultPromise = session.run(
								'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:answer]-> (f:'+link+' {name : "link",value : "'+blog+'"}) return d,f');
							resultPromise.then((result) => {
							})
						})
					})
				})
			})
		}


/*=================If SubDomain====================*/
	else if(body.selectedContext.label == staticconfig.subdomain.subdomain) {

		const resultPromise = session.run(
			'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})  return d'
			);
		resultPromise.then((result)=>{
			/*================Querry for video links================*/		
			videoLink.map((vid)=>{           
				const resultPromise = session.run(
					'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"})  return d,e'
					);

				resultPromise.then((result) => {
					/*================Querry for blog links================*/	
					blogLink.map((blog)=>{
						const resultPromise = session.run(
							'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d, f'
							);
						resultPromise.then((result) => {
						})
					})
				})
			})
		})
	}


	/*===================If Entity=========================*/
		else if(body.selectedContext.label == staticconfig.entity.entity) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result) => {
				/*================Querry for video links================*/	
				videoLink.map((vid)=>{
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})  merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"})  return d,e'
						);

					resultPromise.then((result) => {
						/*================Querry for blog links================*/	
						blogLink.map((blog)=>{
							const resultPromise = session.run(
								'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d,f'
								);
							resultPromise.then((result) => {
							})
						})
					})
				})
			})
		}
	}


/*=====================If context is not defined======================*/
	else {
		const resultPromise = session.run(
			'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
			);
		resultPromise.then((result)=>{
			/*================Querry for video links================*/	
			videoLink.map((vid)=>{
				const resultPromise = session.run(
					'match (a:Domain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"})  return d,e'
					);

				resultPromise.then((result) => {
					/*================Querry for blog links================*/	
					blogLink.map((blog)=>{
						const resultPromise = session.run(
							'match (a:Domain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d,f'
							);

						resultPromise.then((result) => {
						})
					})
				})
			})
		})
	}
}




if((videoLink.length!=0)&&(blogLink.length==0) &&(subIntent.length == 0) && (con.value!=""))
{
	if(body.selectedContext.label != "") {
		/*=================Domain============*/
		if(body.selectedContext.label == staticconfig.domain.domain) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				)
			resultPromise.then ((result) => {
				/*================Querry for video links================*/	
				videoLink.map((vid)=>{
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge(d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"})  return d,e');
					resultPromise.then((result) => {
					})
				})
			})
		}


		/*==================SubDomain=====================*/	
		else if(body.selectedContext.label == staticconfig.subdomain.subdomain) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})  return d'
				);
			resultPromise.then((result)=>{
				/*================Querry for video links================*/	
				videoLink.map((vid)=>{           
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"})  return d,e'
						);
					resultPromise.then((result) => {
					})
				})
			})
		}

	/*=====================Entity=================*/
		else if(body.selectedContext.label == staticconfig.entity.entity) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result) => {
				/*================Querry for video links================*/	
				videoLink.map((vid)=>{
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"})  merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"})  return d,e'
						);
					resultPromise.then((result) => {
					})
				})
			})
		}
	}


/*=====================If context is not defiend=====================*/
		else {
			const resultPromise = session.run(
				'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result)=>{
				/*================Querry for video links================*/	
				videoLink.map((vid)=>{
					const resultPromise = session.run(
						'match (a:Domain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(e:'+video+' {name : "video",value : "'+vid+'"})  return d,e'
						);
					resultPromise.then((result) => {
					})
				})
			})
		}
	}


/*=================================bloglink defined and subIntent and videoLink are undefined ===============*/

if((videoLink.length==0)&&(blogLink.length!=0) && (subIntent.length!=0)&& (con.value!="")){
	if(body.selectedContext.label != "") {
		/*====================Domain===============*/
		if(body.selectedContext.label == staticconfig.domain.domain) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result) => {
				/*================Querry for blog links================*/	
				blogLink.map((blog)=>{
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubDomain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d,f'
						);
					resultPromise.then((result) => {
					})
				})
			})
		}


		/*=================SubDomain=================*/
		else if(body.selectedContext.label == staticconfig.subdomain.subdomain) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result) => {
				/*================Querry for blog links================*/	
				blogLink.map((blog)=>{
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:Entity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d,f'
						);
					resultPromise.then((result) => {
					})
				})
			})
		}

		/*=================Entity================*/
		else if(body.selectedContext.label == staticconfig.entity.entity) {
			const resultPromise = session.run(
				'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"}) merge (b)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result) => {
				/*================Querry for blog links================*/	
				blogLink.map((blog)=>{
					const resultPromise = session.run(
						'match (a:'+body.selectedContext.label+' {name:"'+body.selectedContext.name+'"})-[:type]->(b:SubEntity {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d,f'
						);
					resultPromise.then((result) => {
					})
				})
			})
		}
	}

/*=======================If context is not defined===================*/
		else {
			const resultPromise = session.run(
				'match (a:Domain {name:"'+body.context.name+'"}) merge (a)-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) return d'
				);
			resultPromise.then((result) => {
				/*=================Blog links=================*/
				blogLink.map((blog)=>{
					const resultPromise = session.run(
						'match (a:Domain {name:"'+body.context.name+'"})-[:'+con.name+']->(d:Attribute { name : "'+con.name+'", value : "'+con.value+'"}) merge (d)-[:answer]->(f:'+link+' {name : "link",value : "'+blog+'"}) return d,f'
						);
					resultPromise.then((result) => {
					})
				})
			})
		}}
	})
}