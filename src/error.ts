import { Response, Request, NextFunction } from "express";

interface GpwsError extends Error {
    status?: number
}

export function error_handler(err:GpwsError, res: Response, req: Request, next: NextFunction) {
    return res.status(err.status || 500).send({error: err.message})
}