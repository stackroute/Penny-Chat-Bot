let demo=require('../../model/questionbank_schema');

export default (questions) => {
 console.log('datatataa....',questions)

 let data1 = {"question" : questions};

 demo.update({},{$addToSet : {questions:data1}},{upsert:true},(err,data)=>{
   if(err)
   {
     console.log(err);
       //res.send(err);
     }
     else{
       console.log('hello', data)
       console.log("update successfully");
   //res.json({data:data});
 }
})
}