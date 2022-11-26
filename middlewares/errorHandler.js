
const {ValidationError}  = require("joi");
const CustomErrorHandler = require('../service/customeErrorHandler');

const errorHandler= (error, req, res, next)=>{
    let status_code = 500;
    let data = {
        message: 'Internal server error',
        originalError: error.message
    }

    if( error instanceof ValidationError ){
        status_code = 422;
        data = {
            message: error.message
        }
    }

    if (error instanceof CustomErrorHandler) {
        status_code = error.status;
        data = {
            message: error.message
        }
    }

    return res.status(status_code).json(data);
}

module.exports = errorHandler;