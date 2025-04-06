const bcryptjs=require('bcrypt')
const jwt=require('jsonwebtoken')
const {User}=require('../db.js')
const {Crime}=require('../db.js')

require('dotenv').config()
const sendEmail=require('../Mailer.js')
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

// controller for sending mail to user when he arrives logs in  (when user arrived on landing page , mail needs to be send only once)
const haversineDistance=require('../Haversine.js')
const { distance } = require('motion')
let sendMails = async (req, res) => {
    let data = req.body.email;
    let latitude=req.body.latitude;
    let longitude=req.body.longitude;
    // console.log('ans is',latitude,longitude);
    try {
        // Fetching all crime data from the backend
        let crimeRes = await Crime.find({});
        
        // Fetching user data by email
        let userData = await User.findOne({ email: data }); // Assuming `email` is unique

        if (!userData) {
            return res.status(404).send({ message: "User not found" });
        }

        if (crimeRes.length > 0) {
            for (const crime of crimeRes) {
                const lat=crime.crimes[0].latitude;
                const long=crime.crimes[0].longitude;
                // console.log(lat,long,crime.crimes[0].incidentType);
                // Check if the crimeId exists in the user's emailList
                const distance=haversineDistance(latitude,longitude,lat,long);
                // console.log(distance)
                if(distance<5){
                const crimeIdExists = userData.emailList.some(
                    (id) => id.toString() === crime._id.toString()
                );

                if (!crimeIdExists) {
                    // Send email logic (implement your sendEmail function)
                    await sendEmail(userData.email, crime.crimes[0]);

                    // Add the crimeId to emailList
                    userData.emailList.push(crime._id);
                }
            

            // Save the updated userData after modifying emailList
            await userData.save();
                }
        }
        }

        res.status(200).send({ message: "Emails processed successfully" });
    } catch (error) {
        console.error("Error in sendMails:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};





module.exports={userRegistration,userLogin,sendMails}