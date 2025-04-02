const mongoose=require('mongoose');
require('dotenv').config()

const DB_URL=process.env.DB_URL ;

mongoose.connect(DB_URL)
.then(()=>console.log('database connect'))
.catch((err)=>console.log(err))

const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    agreeTerms:{type:Boolean,required:true}

})

const policeSchema=mongoose.Schema({
    police:[
    {
        name:{
            type:String,
            default:"Hello"
        },
        policeStation:{
            type:String,
            default:"Vijaynagar"
        }
    },
    {
        name:{
            type:String,
            default:"Hello2"
        },
        policeStation:{
            type:String,
            default:"Chipiyana"
        }
    }
    ]
})

const crimeSchema=mongoose.Schema({
        crimes: [
          {
            email:{type:String,required:true},
            contact: { type: String, required: true },
            description: { type: String, required: true },
            incidentType: { 
                type: String, 
                enum: ['theft', 'assault', 'vandalism', 'suspicious', 'other'], 
                required: true 
              },        
            isAnonymous: { type: Boolean, default: false },
            location: { type: String, required: true },
            name: { type: String, required: true },
            urgency: { 
                type: String, 
                enum: ['emergency', 'non-emergency', 'isAnonymous'], 
                required: true 
              }        
          }
        ]
});

const User=mongoose.model('user',userSchema)
const Police=mongoose.model('police',policeSchema)
const Crime=mongoose.model('crime',crimeSchema)