const bcryptjs=require('bcrypt')
const jwt=require('jsonwebtoken')
const {User}=require('../db.js')
require('dotenv').config()
// user registration
let userRegistration=async (req,res)=>{
    let body=req.body;
    // console.log(body)
    let search= await User.find({email:body.email})
    if(search.length===0){
        let hashed_pass=await bcryptjs.hash(body.password,10);
        body.password=hashed_pass;
        body.confirmPassword=hashed_pass;
        let ans=await User.create(body)
        res.status(201).send({message:'user created',payload:ans})
    }
    else{
        res.status(201).send({message:'user already exists'})
    }
}

//user login

let userLogin=async (req,res)=>{
    let body=req.body;
    let search=await User.find({email:body.email});
    if(search.length===0){
        res.status(201).send({message:'Invalid Email'})
    }
    else{
        const result=await bcryptjs.compare(body.password,search[0].password);
        if(result==false){
            res.status(201).send({message:'wrong password'})
        }
        else{
            const signedToken = jwt.sign(
                { email: search.email },
                process.env.SECRET_KEY,
                { expiresIn: "1d" }
            );
            res.status(201).send({message:"login successful",token:signedToken,user:search[0]});
        }
    }
}



module.exports={userRegistration,userLogin}