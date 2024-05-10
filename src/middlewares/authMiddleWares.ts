import session from '../service/auth';
import { Request, Response, NextFunction } from 'express';
import MyJwtPayload from '../shared/MyJwtPayload';

const checkForAuthentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token as string;
        req.user = null;
        if (!token) return next();
        const user = session.getSession(token);
        req.user = user as MyJwtPayload;
        return next();
    } catch (error) {
        console.log("401 error occured")
        return res.status(401).json({
            error: "Unauthorized"
        })
    }
}

const restrictTo = (roles: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return res.status(400).json({
            error: "No user for this session found, Please Log In"
        });
        let user: MyJwtPayload = req.user as MyJwtPayload;
        if (!roles.includes(user.role)) return res.status(401).json({
            error: "Unauthorized"
        });
        return next();
    }
}

export default {
    checkForAuthentication,
    restrictTo
}