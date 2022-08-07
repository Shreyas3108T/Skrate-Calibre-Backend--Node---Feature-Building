const jwt = require("jsonwebtoken");
const UserModel = require("../database/db")
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;


class tickets{

    newUser(req,res){
        try{
        const {username,role} = req.body;
        const accessToken = jwt.sign({username:username,role:role},accessTokenSecret)
        const user = new UserModel({
            username:username,
            role:role,
            AuthToken:accessToken
        })
        user.save((err,response)=>{
            if(err){
                console.log(err)
            }
        })
       return res.status(200).json({AuthToken:accessToken})
        }
        catch(error){
            return res.status(501).json({error:"Internal Server Error"})
        }
    }
}


module.exports = new tickets();