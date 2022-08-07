const jwt = require("jsonwebtoken");
const { off } = require("../database/db");
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
        const {title,description,assignedTo,priority} = req.body
        var user
        var newTicket
        if(!assignedTo && !priority){
            newTicket = new ticketModel({
                title:title,
                description:description,
            })
        }
        if(!priority && assignedTo){
            user = await UserModel.findOne({username:assignedTo,role:"employee"})
            if(user == null){
                return res.status(401).json({error:"no such username found"})
            }
            newTicket = new ticketModel({
                title:title,
                description:description,
                assignedTo:assignedTo
            })
        }
        if(priority && !assignedTo){
            newTicket = new ticketModel({
                title:title,
                description:description,
                priority:priority
            })
        }
        else{
        user = await UserModel.findOne({username:assignedTo,role:"employee"})
        if(user == null){
            return res.status(401).json({error:"no such username found"})
        }
        newTicket = new ticketModel({
            title:title,
            description:description,
            assignedTo:assignedTo,
            priority:priority
        })}

        const ticket = await newTicket.save()
        res.status(200).json({id:ticket.id})
        }
        catch(error){
            return res.status(501).json({error:"Internal Server Error",errors:error}) 
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

    async ticketMarkAsClosed(req,res){
        try{
            const priority = {'low':1,'medium':2,'high':3}
            const {ticketID}= req.body
            try{
            const ticket = await ticketModel.findById(ticketID)
            const k =ticket.priority
            if(ticket.status == 'close'){
                return res.status(409).json({message:"ticket already closed"})
            }
            if (req.role == "admin" || req.user == ticket.assignedTo){
                const tickets = await ticketModel.find({assignedTo:req.user,status:"open"})
                console.log(tickets)
                var bool = false
                var higherTasks =[]
                tickets.forEach((element)=>{
                    if(priority[element.priority] >priority[k]){
                        bool = true
                        higherTasks.push(element)
                    }
                })
                if(bool){
                    return res.status(401).json({message:"A higher priority task remains to be closed",data:higherTasks})
                }
                const ticket = await ticketModel.findByIdAndUpdate(ticketID,{status:"close"})
                return res.status(200).json({message:"ticket closed succesfully"})  
            }
            return res.status(401).json({message:"unauthorised"})
            }
            catch(error){
                return res.status(401).json({message:"error with ticketId",error:error})
            }
        }
        catch(error){
           return res.status(501).json({message:"internal sever error"}) //62efa85e51cf982024df0730
        }
    }

    async ticketdelete(req,res){
        try{
            const {ticketID}= req.body

            const deletedticket = await ticketModel.findByIdAndDelete(ticketID)
            if(!deletedticket){
                return res.status(404).json({message:"no ticket found"})
            }
            return res.status(200).json({message:"ticket deleted"})
        }catch(error){ 
            return res.status(501).json({message:"internal sever error"})
        }
    }
}

module.exports = new tickets();