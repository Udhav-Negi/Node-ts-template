export const errorResponse = (message : string, statusCode : number) => {
    return {
        error : true,
        message,
        statusCode
    }
}