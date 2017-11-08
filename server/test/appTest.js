let supertest = require('supertest');
let express = require('express');
let sinon = require('sinon');
let should=require('chai').should();
let expect = require('chai').expect;
let assert = require('chai').assert;
let app = require('../app').default;
import jwt from 'jsonwebtoken';
import passport from 'passport';
let testconfig = require('./test-config');
import register_model from '../model/register_schema';


let registerCount = sinon.stub(register_model, 'count');
let registerFind = sinon.stub(register_model, 'find');
let registerRemove = sinon.stub(register_model, 'remove');
let registerUpdate = sinon.stub(register_model, 'update');
let registerUpdateOne = sinon.stub(register_model, 'updateOne');
let registerFindOne = sinon.stub(register_model,'findOne');
let url=supertest(app);

let jwtToken;


/*=============================Start of Positive test for verify user=============================*/
describe('verify_user processed here',()=>{
before(()=>{
//yield is used to stub the info required by database
registerFind.yields(null,[testconfig.verifyuser.findyield])
registerUpdate.yields(null,[testconfig.verifyuser.updateyield])
});
registerFind.yields(null,[testconfig.verifyuser.findyield2])

it('Update must be a success positive',(done)=>{
url
.get('/verify_user/:59c393d31f0a19213741e83e')
.set('Authorization', 'bearer' +jwtToken)
.expect(200)
.expect('Content-Type', /json/)
.end((err,res)=>{
  if(err){
    return err;
  }
  else if(res.body.data==null){
    assert.equal(res.body.data,null);
    done();
  };
});
});
});
//=============================End of Positive test for verify user=============================

/*=============================Start of Negative test for verify user=============================*/
describe('verify_user processed here',()=>{
 before(()=>{
 //yield is used to stub the info required by database
registerFind.yields(null,null)
 });

 it('Update must be a success negative',(done)=>{
 url
.get('/verify_user/59c393d31f0a19213741e83e')
 .expect(200)
 .expect('Content-Type', /json/)
.end((err,res)=>{
 if(err){
      return err;
 }
 else if(res.body.data== null)
 {
  assert.equal(res.body.data,null);
     done();
  };
 });
 });
 });
/*=============================End of Negative test for verify user=============================*/

/*=============================start of Positive  Testing forgot_password============================*/

 describe('forgot processed here empty find',()=>{  

before(()=>{

  

 //yield is used to stub the info required by database

 registerFind.yields(null,null)

 registerUpdate.yields(null,[{status:true, message : "success"}])

});

 it('Update must be a success',(done)=>{

 url

   .post('/forgot_password')

   .set('Authorization', 'bearer' +jwtToken).expect(200)

   .expect('Content-Type', /json/)

   .send({email : "shagunsankla61@gmail.com"})

   .end((err,res)=>{

     if(err){

      return err;

     }

       else{

      assert.equal(res.body.status,false);

    done();

};

});

 });

});

/*=============================end of Positive  Testing forgot_password============================*/

/*=============================start of Negative  Testing forgot_password============================*/

 describe('forgot processed here empty update',()=>{  

before(()=>{ 

 //yield is used to stub the info required by database

 registerFind.yields(null,[testconfig.forgotpassword.findyield]);

 registerUpdate.yields(null,null);

});

 it('Update must be a success',(done)=>{

 url

   .post('/forgot_password')

   .set('Authorization', 'bearer' +jwtToken).expect(200)

   .expect('Content-Type', /json/)

   .send(testconfig.forgotpassword.findyield)

   .end((err,res)=>{

     if(err){

      return err;

     }

       else{     

      assert.equal(res.body.status,false);

    done();

};

});

 });

});

 /*=============================end of Negative  Testing forgot_password============================*/

 /*================================start Testing of warning_page===================================*/

 /*================================start positive testing of warning_page ============================*/

     

describe('warning_page processed here',()=>{

before(()=>{

//yield is used to stub the info required by database

registerFind.yields(null,null)

});

it('Update must be a success',(done)=>{

url

.get('/warning_page/:59c393d31f0a19213741e83e')

.set('Authorization', 'bearer' +jwtToken).expect(200)

.expect('Content-Type', /json/)

.end((err,res)=>{

  if(err){

      return err;

  } 

  else if(res.body.data== null)

  {

   assert.equal(res.body.data,null);

   done();

  };

});

});

});

 /*================================end negative testing of warning_page ============================*/

/*=============================Start of Positive test for warning page=============================*/

describe('warning_page processed here',()=>{

before(()=>{

//yield is used to stub the info required by database

registerFind.yields(null,[testconfig.warningfindresponse])

registerUpdate.yields(null,[testconfig.warningUpdateresponse])

});

registerFind.yields(null,[testconfig.warningfindresponse])

it('Update must be a success',(done)=>{

url

.get('/warning_page/:59c393d31f0a19213741e83e')

.set('Authorization', 'bearer' +jwtToken).expect(200)

.expect('Content-Type', /json/)

.send({

 })

.end((err,res)=>{

  if(err){

    return err;

  }

  else if(res.body.data==null){

    assert.equal(res.body.data,null);

    done();

  };

});

});

 it('Update must be a success negative',(done)=>{
 url
.get('/verify_user/59c393d31f0a19213741e83e')
 .expect(200)
 .expect('Content-Type', /json/)
.end((err,res)=>{
 if(err){
      return err;
 }
 else if(res.body.data== null)
 {
  assert.equal(res.body.data,null);
     done();
  };
 });
 });
 });
/*=============================End of Negative test for verify user=============================*/

/*=============================end of Positive test for warning page=============================*/

 /*================================end Testing of warning_page===================================*/

/*=============================Start of Positive test for set_password method of surveyid=============================*/

describe('set_password  here',()=>{

before(()=>{

//yield is used to stub the info required by database

registerFind.yields(null,[testconfig.setpassword.positiveSetpasswordfind])

registerUpdate.yields(null,[testconfig.setpassword.positiveSetpasswordupdate])

});

it('find positive must be a success',(done)=>{

url

  .put('/set_password/naman/12')

  .set('Authorization', 'bearer' +jwtToken)

  .expect(200)

  .expect('Content-Type', /json/)

  .send()

  .end((err,res)=>{

    if(err){

      return err;

  }

      else{

     assert.equal(res.body.status,false);

   done();

};

});

});

});

/*=============================End of Positive test for set_password method of surveyid=============================*/

/*=============================Start of Negative test for set_password method of surveyid=============================*/

describe('set_password processed here',()=>{

before(()=>{

//yield is used to stub the info required by database

registerFind.yields(null,null)

});

it('find negative must be a success',(done)=>{

url

.put('/set_password/naman/122')

.set('Authorization', 'bearer' +jwtToken).expect(200)

.send()

.expect('Content-Type', /json/)

.end((err,res)=>{

  if(err){

    return err;

  } 

    else if (res.body.data==undefined){

   assert.equal(res.body.data,null);

 done();

};

});

});

});

/*=============================End of Negative test for set_password method of surveyid=============================*/

//====================================loginTest=============================================*/
 
//================start of negative Signin if data is not available in database===============*/
describe('Signin processed here', function() {
before(() => {
  registerFindOne.yields(null, null);
});

it('signin must fail', function() {
  let token = "some token";
  url
  .post('/login')
  .send(testconfig.signin.sendyield)
  //.set('Authorization').expect(200)
  .end((err,res) => {
    if(err) {
     
      return done(err);
    }
   
    })
});
});

//*===========End of negative Signin if data is not available in database=============*/


//=======start of positive Signin if data is available but email is wrong==========*/
describe('Signin data processed here',() => {
before(() => {
  registerFindOne.yields(null, [testconfig.signin.findyield]);
})

it('signin must work',() => {
  url
  .post('/login')
  .send(testconfig.signin.sendyield)
  //.set('Authorization').expect(200)
  .end((err,res) => {
    if(err) {
      return done(err);
    }
    
    })
});
});
//======end of positiveSignin if data is available but email is wrong===========*/