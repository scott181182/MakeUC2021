import { promises as fs, createReadStream } from "fs";

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



export async function serveAudio(req: Request, res: Response, filepath: string) {
    const stat = await fs.stat(filepath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if(range) {
        const [ startStr, endStr ] = range.replace(/bytes=/, "").split("-");
        const start = parseInt(startStr, 10);
        const end = endStr
            ? parseInt(endStr, 10)
            : fileSize - 1;
        const chunksize = (end - start) + 1;
        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'audio/ogg',
        });
        createReadStream(filepath, { start, end }).pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': 'audio/ogg',
        });
        createReadStream(filepath).pipe(res);
    }
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
