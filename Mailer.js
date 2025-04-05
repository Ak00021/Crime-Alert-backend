const nodemailer=require('nodemailer');
require('dotenv').config()
const sendEmail=async(recipientList,crime)=>{
    // console.log('test',recipientList,crime)
    const user=process.env.USER
    const pass=process.env.PASS
    const transport=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:user,
            pass:pass
        },
    });
    // Email details
    const mailOptions={
        from: user,
        to: recipientList,
        subject: `${crime.incidentType} occured at current Location(Testing)`,
        text:`${crime.description}. Location of the crime is ${crime.location}`
    };
    try {
        const result=await transport.sendMail(mailOptions);
        console.log('Email sent:', result.response);
    }
    catch(error){
        console.log("Error sending email",error);
    }
};

module.exports=sendEmail;