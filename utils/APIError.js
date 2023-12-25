class APIError extends Error{
    constructor(message, statusCode, err){
        super();
        this.message = message;
        this.status = statusCode;
        this.data = err;
        Error.captureStackTrace(this);
    }
}

module.exports = APIError;