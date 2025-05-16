export const successResponse = (error : boolean, message : string, data : any, statusCode : number) => {
    return {
        error,
        message,
        data,
        statusCode
    }
}