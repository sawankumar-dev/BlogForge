export class ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    constructor (
        statusCode: number,
        message: string,
        data: T,
    ) {
        this.success = statusCode >= 200 && statusCode  < 300;
        this.message = message;
        this.data = data;
    }
}