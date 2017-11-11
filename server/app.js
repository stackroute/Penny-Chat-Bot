import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import session from 'express-session';
import path from 'path';
// import configPassport from './config/passport';
import passport from 'passport';
import verifyuser from './routes/verify_user';
// start importing of routes
import forgotPassword from './routes/forgot_password';
import setPassword from './routes/setpassword';
import warning_page from './routes/warning_page';
import warningPage from './routes/warning_page';
import neo from './routes/neo/neo4j';
import tokenise from './routes/tokenise';
import logout from './routes/logout';
import signup from './routes/signup';
import answerbot from './routes/answerbot';
import trainIntent from './routes/train_intent';
import ques from './routes/question_answer/ques_ans';
import synonym from './routes/synonym';
import addcontext from './routes/train_context';
import suggest from './routes/suggestsynonym';
import unques from './routes/unanswerques';
import questokenize from './routes/questiontokenize';
import followup from './routes/followup';
import editContext from './routes/editContext';
import updateUserdata from './routes/updateUserdata';
import reset_password from './routes/reset_password';
// end importing of routes

import http from 'http';
import mongoose from 'mongoose';
import logger from './log4js';
// import favicon from 'serve-favicon';
import sentiment from './routes/sentiment';
import signin from './routes/signin';
import addtask from './routes/addtask'
import config from './config/config';
import cors from 'cors';
import staticConfig from './config/staticConfig';
import configPassport from './auth/passport';

const app = express();
configPassport(passport);   // configure passport

app.use(passport.initialize());  // initialise passport authentication
app.use(passport.session());  // creating passport session

const debug = Debug('server:app');
app.set('views', path.join(__dirname, 'views'));
// view engine setup
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

 app.use(session({
  secret : config.secret,
  resave : true,
  saveUninitialized : true
 }));

app.use(cors());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.url, {server:{auto_reconnect:true}});
let db = mongoose.connection;
  db.on('connecting', ()=>{
    logger.debug(staticConfig.db.mongoose_Connecting);
  });
  db.on('error', (error)=>{
    logger.debug(staticConfig.db.mongoose_Error+ error);
    mongoose.disconnect();
  });
  db.on('connected', ()=>{
    logger.debug(staticConfig.db.mongoose_Connected);
  });
  db.once('open', ()=>{
    logger.debug(staticConfig.db.mongoose_Open);
  });
  db.on('reconnected',()=>{
    logger.debug(staticConfig.db.mongoose_Reconnected);
  });
  db.on('disconnected', ()=>{
    logger.debug(staticConfig.db.mongoose_Disconnected);
  });
 
app.use(express.static(path.join(__dirname, 'public')));
//=======================log4js Implementation==========================================

//logger.debug(staticConfig.loggerDebugAppjs.beforeSigninroute);
app.use('/signin',signin);
app.use('/addtask',addtask);
app.use('/forgot_password',forgotPassword);
app.use('/set_password',setPassword);
app.use('/warning_page',warningPage);
app.use('/warning_page',warning_page); 
app.use('/neo',neo);
app.use('/',signin);
app.use('/register',signup);
app.use('/tokenise',tokenise);
app.use('/forcelogout',logout);
app.use('/verify_user',verifyuser);
app.use('/answerbot',answerbot);
app.use('/train_intent',trainIntent);
app.use('/ques_ans',ques);
app.use('/unques',unques);
app.use('/synonym',synonym);
app.use('/followup',followup);
app.use('/addcontext',addcontext);
app.use('/suggest',suggest);
app.use('/questoken',questokenize);
app.use('/sentiment',sentiment);
app.use('/editContext',editContext);
app.use('/updateUserdata', updateUserdata);
app.use('/reset_password', reset_password);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// app.listen(8000,()=>{
//   console.log("\nconnected on port : 8000\n");
// });

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(err);

  //logger.error(err.status + ' ' + staticConfig.loggerErrorAppjs.internalServerError);

});

export default app;