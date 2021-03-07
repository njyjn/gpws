import { NextFunction, Response, Request } from 'express';
const auth_token = process.env.AUTH_TOKEN

export function isGpwsAuthorized(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization
    if(header) {
        const splut = header.toString().split(' ');
        const key = splut[0];
        const token = splut[1];
        if(key === 'Bearer' && token === auth_token) {
            return next()
        }
    }
    return res.status(403).send({error: 'unauthorized'})

}