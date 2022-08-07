const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,enum:["open","close"],default:"open"},
    priority:{type:String,enum:["low","medium","high"],default:"low"},
    assignedTo:{type:String}
},{timestamps:true})

module.exports = mongoose.model('Ticket',ticketSchema)