const { verify } = require("jsonwebtoken");
const APIError = require("../utils/APIError");

const isAuth = (req, res, next) => {
    const { token } = req.headers;
    if(!token){
        throw new APIError('No token found', 403);
    }
    try{
        req.locals = verify(token, process.env.JWT_KEY);
        next();
    }
    catch(err){
        throw new APIError(err.message, 400);
    }
}

module.exports = isAuth;