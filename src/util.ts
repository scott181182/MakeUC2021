import { Request, Response } from "express";



export function sendData(res: Response, data: any): void;
export function sendData(res: Response, data: any, count: number): void;
export function sendData(res: Response, data: any, count?: number) {
    if(count != undefined) {
        res.json({ status: "success", ...data, count });
    } else {
        res.json({ status: "success", ...data });
    }
}



export function sendError(res: Response, status: number, message: string) {
    res.status(status).json({ status: "error", message });
}



export class ResponseError extends Error {
    public constructor(
        message: string,
        public readonly status = 500
    ) {
        super(message);
    }

    public static handle(res: Response, err: any) {
        if(err instanceof ResponseError) {
            return sendError(res, err.status, err.message);
        } else {
            console.error(err);
            return sendError(res, 500, "An unknown error occurred");
        }
    }
}
