const nodemailer=require('nodemailer');
require('dotenv').config()
const sendEmail=async(recipientList)=>{
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
        to: recipientList.join(','),
        subject: 'Crime Alert',
        text: 'A crime has been reported in your area. Please stay alert and take necessary precautions.'
    };
    try {
        const result=await transport.sendMail(mailOptions);
        console.log('Email sent:', result.response);
    }
    catch(error){
        console.log("Error sending email",error);
    }
};