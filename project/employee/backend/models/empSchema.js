const mongoose=require('mongoose')
const empScheme=mongoose.Schema({
    empId:String,
    empName:String,
    designation:String,
    salary:Number,
    department:String,
    location:String
})
const empData=mongoose.model('empdb',empScheme)
module.exports=empData