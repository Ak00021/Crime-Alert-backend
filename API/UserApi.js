const exp=require('express')
//creating a mini express app
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')

const {userRegistration,userLogin,sendMails}=require('../Contollers/UserController.js')

//registration
userApp.post('/user_reg',expressAsyncHandler(userRegistration))
//login
userApp.post('/user_login',expressAsyncHandler(userLogin))

// sending mail to all users upon ariving on alerts page
userApp.post('/send_mail',expressAsyncHandler(sendMails));


module.exports=userApp;