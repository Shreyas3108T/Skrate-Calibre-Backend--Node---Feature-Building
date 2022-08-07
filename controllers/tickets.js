const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;

class tickets{
    async newUser(req,res){
        const {username,role} = req.body
        const accessToken = jwt.sign({username:username,role:role})
        return res.status(200).json({AuthToken:accessToken})
    }
}
module.exports = new tickets()