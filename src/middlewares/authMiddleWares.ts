import session from '../service/auth.js';
import { Request, Response, NextFunction } from 'express';
import MyJwtPayload from '../shared/MyJwtPayload.js';
import z from 'zod';

const registerSchema = z.object({
    firstname: z.string().min(3),
    lastname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

const otpVerificationSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6)
});

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

const validateRegistrationSchema = (req: Request, res: Response, next: NextFunction) => {
    try {
        registerSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message
                }))
            });
        }
        console.error(error);
        console.log("Registration schema malformed")
        return res.status(400).json({
            error: "Bad request detected"
        })
    }
};

const validateLoginSchema = (req: Request, res: Response, next: NextFunction) => {
    try {
        loginSchema.parse(req.body);
        next();
    } catch (error) {
        console.log("Login schema malformed")
        return res.status(400).json({
            error: "Bad request"
        })
    }
};

const validateOtpSChema = (req: Request, res: Response, next: NextFunction) => {
    try {
        otpVerificationSchema.parse(req.body);
        next();
    } catch (error) {
        console.log("Login schema malformed")
        return res.status(400).json({
            error: "Bad request"
        })
    }
};

export default {
    checkForAuthentication,
    restrictTo,
    validateRegistrationSchema,
    validateLoginSchema,
    validateOtpSChema
}

