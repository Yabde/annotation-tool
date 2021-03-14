import jwt from "jsonwebtoken";
import {UserModel} from "@models/User";

export const generateToken = (user: UserModel): string => {
    const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    return jwt.sign(user, secret, {expiresIn: '24h'});
};
