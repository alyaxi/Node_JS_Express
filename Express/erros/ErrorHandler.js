class ErrorHandler {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }

    static validationError(message = "All fields are required") {
        return new ErrorHandler(400, message);
    }

    static notFound(message = "Not Found") {
        return new ErrorHandler(404, message);
    }

    static internalServerError(message = "Internal Server Error") {
        return new ErrorHandler(500, message);
    }

    static forbidden(message = "Not Allowed") {
        return new ErrorHandler(403, message);
    }
}


module.exports = ErrorHandler;
