class ApiSuccess<T> {
    readonly statusCode: number;
    readonly status: boolean;
    readonly data: T | null;
    readonly message: string;

    constructor(
        statusCode: number = 200,
        data: T | null = null,
        message: string = "Success",
        status: boolean = true,
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.status = status;
    }
}

export default ApiSuccess;