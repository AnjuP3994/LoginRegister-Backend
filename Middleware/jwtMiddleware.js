// import jwt
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next) => {
    console.log("Inside the router middleware");
    //token verification
    //1. Get the token - from req headers
    const token = req.headers['authorization'].slice(7)
    console.log(token);
    try {
        //2. Verify the token - verify()
        const tokenVerification = jwt.verify(token,'superkey2024')
        console.log(tokenVerification);
        req.payload = tokenVerification.userId
        next()
    } catch (error) {
        res.status(401).json("Authorization failed... please login again.")
    }
}

module.exports = jwtMiddleware;