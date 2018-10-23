module.exports = createDone = (request, response) => {

    return (data) => {
        response.status(200);
        return response.send({
            "status": {
                "status_code": "SUCCESS",
                "error_code": "0",
                "error_massage": ""
            },
            "data":data
        });
    }
}