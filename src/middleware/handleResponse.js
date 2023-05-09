
const successResponse = (req, res) => {

    res.response = function({statusCode = 200, status = true, message, result} = {}){
        this
            .status(statusCode || 200)
            .json({
                ok: status,
                message: message || 'عملیات با موفقیت انجام شد',
                response: result || null
            });
    }
}

const errorResponse = (req, res) => {
    res.exception = function(errorData){
        this
            .status(errorData?.statusCode || 500)
            .json({
                ok: false,
                message: errorData?.message || errorData || 'عملیات با موفقیت انجام نشد',
            });
    }
}


module.exports = (req, res, next) => {
    successResponse(req, res);
    errorResponse(req, res);
    next();
}