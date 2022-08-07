const UserModel = require("../database/db")
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
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
    
    async auth(req,res,next){
        const accessToken = req.headers.authorization.split(" ")[1]
        if(!accessToken){
            return res.status(401).json({Access:"No bearer token provided"})
        }
        const userData = jwt.verify(accessToken,accessTokenSecret)
        const user = await UserModel.find({username:userData.username})
        if(user.length == 0){
            return res.status(409).json({Access:"Invalid token"})
        }
        req.role = userData.role
        return next()

    }

    checkAdmin(req,res,next){
        if(req.role == "admin"){
            return next()
        }
        return res.status(409).json({Acess:"only Admin can access this route!"})
    }
}

module.exports = new ticketMiddlewares();