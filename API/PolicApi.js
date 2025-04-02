const exp=require('express');
const policeApp=exp.Router();
const expressAsyncHandler=require('express-async-handler');

policeApp.post('/login',expressAsyncHandler());
policeApp.post('/regis',expressAsyncHandler());

module.exports=policeApp;