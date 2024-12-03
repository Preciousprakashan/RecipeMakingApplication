

const mongoose = require('mongoose');

mongoose.connect(process.env.MongoDB_URL).then((res)=>{
    console.log("connected successfully");
}).catch((err) => {
    console.log('error in connection',err)
})