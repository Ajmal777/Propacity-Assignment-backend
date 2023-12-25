const APIError = require("../utils/APIError");

const error = (err, req, res, next) => {
    console.log(err);

    if(err instanceof APIError){
        return res.status(err.status).json({
            status: err.status,
            message: err.message
        })
    }

    res.status(500).json({
        status: 500,
        message: 'An error occurred',
    });
}

module.exports = error;