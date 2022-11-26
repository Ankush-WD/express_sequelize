class CustomErrorHandler extends Error{
    constructor(status, mess ){
        super();
        this.status = status;
        this.mess = mess
    }

    static userNotFound(message){
        return new CustomErrorHandler(200, message);
    }
}

exports.module= CustomErrorHandler;