const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        username:{type:String,unique:true,required:true},
        role:{type:String,required:true,enum:["admin","employee"]},
        AuthToken:{type:String,required:true}
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)