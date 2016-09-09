export declare class HttpError extends Error {
    protected status: number;
    message: string;
    constructor(status: number, message?: string);
    getStatus(): number;
    getMessage(): string | any;
}
