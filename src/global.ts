import express from 'express';
import MyJwtPayload from './shared/MyJwtPayload';

declare global {
    namespace Express {
        interface Request {
        user: MyJwtPayload | string | null,
        }
    }
}