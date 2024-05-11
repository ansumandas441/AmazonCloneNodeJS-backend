import { JwtPayload } from 'jsonwebtoken';

interface MyJwtPayload extends JwtPayload {
    _id: string,
    email: string,
    role: string
}

export default MyJwtPayload;