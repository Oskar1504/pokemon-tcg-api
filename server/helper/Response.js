module.exports = {
    buildErrorResponse: function ( e, statusCode = 500){
        return {
            message: e.toString(),
            status: statusCode
        }
    },

    buildResponse: function (data, statusCode = 200){
        return {
            message: 'request success',
            data: data,
            status: statusCode
        }
    }
}