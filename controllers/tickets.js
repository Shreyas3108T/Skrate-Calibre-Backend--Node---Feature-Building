const jwt = require("jsonwebtoken");
const UserModel = require("../database/db")
const ticketModel = require("../database/ticketsModel")
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;


class tickets{

    async newUser(req,res){
        try{
        const {username,role} = req.body;
        const accessToken = jwt.sign({username:username,role:role},accessTokenSecret)
        const user = new UserModel({
            username:username,
            role:role,
            AuthToken:accessToken
        })
        const USER = await user.save()
       return res.status(200).json({AuthToken:accessToken})
        }
        catch(error){
            return res.status(501).json({error:"Internal Server Error"})
        }
    }

    async newTicket(req,res){
        try{
        const {title,description} = req.body
        const newTicket = new ticketModel({
            title:title,
            description:description
        })
        const ticket = await newTicket.save()
        res.status(200).json({id:ticket.id})
        }
        catch(error){
            return res.status(501).json({error:"Internal Server Error"}) 
        }
    }

    async ticketParams(req,res){
        try{
            if(req.params.params == "all"){
                const tickets = await ticketModel.find({}) 
                if(tickets.length>0){
                    return res.status(200).json({tickets:tickets})
                }
                return res.status(404).json({tickets:[],message:"no tickets found"})
            }
            else if(req.query.status){
                if(req.query.status != "open" && req.query.status != 'close'){
                    return res.status(401).json({error:`${req.query.status} is not valid , status can be open or close`})
                }
                const tickets = await ticketModel.find({status:req.query.status})
                if(tickets.length>0){
                    return res.status(200).json({tickets:tickets})
                }
                return res.status(404).json({tickets:[],message:"no tickets found"})
            }
            else if(req.query.title){
                
                const tickets = await ticketModel.find({title:req.query.title})
                if(tickets.length>0){
                    return res.status(200).json({tickets:tickets})
                }
                return res.status(404).json({tickets:[],message:"no tickets found"})
            }
            else if(req.query.priority){
                if(req.query.priority != "low" && req.query.priority != 'medium' && req.query.priority != "high"){
                    return res.status(401).json({error:`${req.query.priority} is not valid , priority can be low,medium or high`})
                }
                const tickets = await ticketModel.find({priority:req.query.priority})
                if(tickets.length>0){
                    return res.status(200).json({tickets:tickets})
                }
                return res.status(404).json({tickets:[],message:"no tickets found"})
            }
            return res.status(401).json({error:"invalid request"})
        }
        catch(error){
            return res.status(501).json({error:"internal server error"})
        }
    }
}

module.exports = new tickets();