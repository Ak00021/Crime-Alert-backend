const exp=require('express')
//creating a mini express app
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')

const {userRegistration,userLogin}=require('../Contollers/UserController.js')

//registration
userApp.post('/user_reg',expressAsyncHandler(userRegistration))
//login
userApp.post('/user_login',expressAsyncHandler(userLogin))


module.exports=userApp;