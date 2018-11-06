"use strict";

module.exports = (request, response) => {

    return (error,error_code) => {
        response.status(error_code);
        return response.send({
            "status": {
                "status_code": "ERROR",
                "error_code": "0",
                "error_massage": error
            }
            
        });
    }
}