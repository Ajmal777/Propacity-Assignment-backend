module.exports.asyncHandler = (callback) => {
    return (req, res, next) => {
        callback(req, res)
        .then(response => res.status(response.status).send(response))
        .catch(err => next(err));
    }
}