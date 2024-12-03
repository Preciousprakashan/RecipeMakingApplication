const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.mongoDB_URL).then(()=>{
    console.log('Connection Established')
}).catch(()=>{
    console.log('Connection to DB Failed')
})