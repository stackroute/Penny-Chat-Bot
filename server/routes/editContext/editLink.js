let express = require('express');
let router = express.Router();
const neo4j = require('neo4j-driver').v1;
import staticconfig from './staticconfig';
import config from '../../config/config';
const driver = neo4j.driver(config.neo4jUrl, neo4j.auth.basic("neo4j", config.neo4jurlpassword));

const session = driver.session();

export default  (req, res)=> {

    let video = staticconfig.video.video;
	let link = staticconfig.link.link;
	let completeContext = req.body.completeContext;
	let context = req.body.context;

	completeContext.map((con) => {
		
		let videoLink=[];
	
		let blogLink=[];
		
		let vid;
		let blog;
		if(con.videoLink != undefined)
		{
			con.videoLink.map(video => {
			
					videoLink.push(video);
			})
		}

		if(con.blogLink != undefined)
		{
			
			con.blogLink.map(blog => {
				
					blogLink.push(blog);
				
			})
		}
console.log('hello2', videoLink)
	
		

if((videoLink.length!=0||videoLink.length==0)&&(blogLink.length!=0||blogLink.length==0)&&(con.value!=undefined))

{
     console.log('hello', context, con.name)
     const resultPromise = session.run(
     'match (a:'+context.label+' {name:"'+context.itemName+'"})-[:'+con.name+']->(b:Attribute {name:"'+con.name+'"})  Set b.value="'+con.value+'" '

      );
     resultPromise.then((result)=>{

     })


						/*=============Querry for video link==============*/				

   videoLink.map((vid)=>{
       console.log('hellochandu',vid);
        if( (vid.id!=undefined)&&(vid.value!="")&&(vid.delete==false))
        {
          console.log('hello3')
          const resultPromise = session.run(
         'Match (n:'+context.label+'{name:"'+context.itemName+'"})-[:'+con.name+']->(x:Attribute{name:"'+con.name+'"})-[:answer]->(p:Video) where ID(p)='+vid.id+' Set p.value="'+vid.value+'" return p'
        );
          resultPromise.then((result)=>{

          })
        }
        else if( (vid.id!=undefined)&&(vid.value==""||vid.value!="")&&(vid.delete==true) )
        {
          console.log('hey in delete', vid)
          const resultPromise = session.run(
          'Match (n:'+context.label+'{name:"'+context.itemName+'"})-[:'+con.name+']->(x:Attribute{name:"'+con.name+'"})-[ans:answer]->(p:Video) where ID(p)='+vid.id+' detach delete ans,p'
        );
           resultPromise.then((result)=>{

          })
        }
       /* else if( (vid.id==undefined)&&(vid.value==""||vid.value!="")&&(vid.delete==true||vid.delete==false))
        {*/
          //Nothing will happen here
        /*}*/
        else if ( (vid.value!="")&&(vid.delete==false) ){
          console.log('hello4')
          const resultPromise = session.run(
        	'match (a:'+context.label+' {name:"'+context.itemName+'"})-[:'+con.name+']->(b:Attribute {name:"'+con.name+'"}) merge (b)-[:answer]->(d:'+video+'{name:"'+vid.name+'", value:"'+vid.value+'"}) return b,d'
           );
          resultPromise.then((result)=>{

          })
        }
     


   });



   blogLink.map((blog)=>{
    
     console.log('hello 4 shivam blog before', blog)

   	/*=============Querry for blog link==============*/
        if( (blog.id!=undefined)&&(blog.value!="")&&(blog.delete==false))
        {
            console.log('hello 5 shivam blog', blog)
          const resultPromise = session.run(
         'Match (n:'+context.label+'{name:"'+context.itemName+'"})-[:'+con.name+']->(x:Attribute{name:"'+con.name+'"})-[:answer]->(p:'+link+') where ID(p)='+blog.id+' Set p.value="'+blog.value+'" return p'
        );
          resultPromise.then((result)=>{

          })
            
        }
        else if( (blog.id!=undefined)&&(blog.value==""||blog.value!="")&&(blog.delete==true) )
        {
             
         const resultPromise = session.run(
          'Match (n:'+context.label+'{name:"'+context.itemName+'"})-[:'+con.name+']->(x:Attribute{name:"'+con.name+'"})-[ans:answer]->(p:'+link+') where ID(p)='+blog.id+' detach delete ans,p'
        );
           resultPromise.then((result)=>{

          })


        }
      /*  else if( (blog.id==undefined)&&(blog.value==""||blog.value!="")&&(vid.delete==true||blog.delete==false))
        {
          // Nothing will happen here
        }*/
        else if ( (blog.value!="")&&(blog.delete==false) ){
             console.log('hello 6 shivam blog', blog)

           const resultPromise = session.run(
          'Match (a:'+context.label+' {name:"'+context.itemName+'"})-[:'+con.name+']->(b:Attribute {name:"'+con.name+'"}) merge (b)-[:answer]->(d:'+link+'{name:"'+blog.name+'", value:"'+blog.value+'"}) return b, d'
           );
          resultPromise.then((result)=>{

          });

        }
     


   });


}






})

}
