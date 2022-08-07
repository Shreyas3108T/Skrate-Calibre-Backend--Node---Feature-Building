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
}


module.exports = new tickets();