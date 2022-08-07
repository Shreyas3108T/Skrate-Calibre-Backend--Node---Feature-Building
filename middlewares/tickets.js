const UserModel = require("../database/db")
const {validationResult} = require("express-validator")
class ticketMiddlewares{
    async CheckUsername(req,res,next){
        const {username} = req.body;
        const user = await UserModel.find({username:username})
        if(user.length!=0){
            return res.status(409).json({error:"username not unique"})
        }
        return next()
    }

    async checkRole(req,res,next){
        const {role} = req.body;
        if(role == "admin" || role =="employee"){
            return next()
        }
        return res.status(409).json({error:"role can either be admin or employee"})
    }

     checkInput(req,res,next){
        const errors =  validationResult(req);
        if(!errors.isEmpty()){
                return res.status(409).json({error:errors})
            }
        return next()
    }
        
}

module.exports = new ticketMiddlewares();