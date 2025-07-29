class ApiError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: Record<string, unknown> | null;
    public readonly errorCode?: string;

    private static statusMessages: Record<number, string> = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        500: "Internal Server Error",
    };

    constructor(
        statusCode: number = 500,
        message?: string,
        details?: Record<string, any> | null,
        isOperational?: boolean,
        errorCode?: string
    ) {
        super(message || ApiError.statusMessages[statusCode] || "Something went wrong.");
        this.statusCode = statusCode;
        this.isOperational = isOperational ?? true;
        this.details = details || null;
        this.errorCode = errorCode;

        // Maintain proper stack trace for where the error was thrown
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;