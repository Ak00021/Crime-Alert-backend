const exp=require('express');
const CrimeApp=exp.Router();
const expressAsyncHandler=require('express-async-handler');

const {registerCrime,getCrimeData}=require('../Contollers/CrimeController.js')

CrimeApp.post('/newCrime',expressAsyncHandler(registerCrime));

CrimeApp.get('/getCrimedata',expressAsyncHandler(getCrimeData));


module.exports=CrimeApp;