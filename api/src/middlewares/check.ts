import {Request, Response, NextFunction} from "express";
import {HTTP400Error} from "@utils/http.errors";
import {validateEmail, validatePwd} from "@shared/functions/checks";

export const checkSearchParams = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.q) { return next(); }
    throw new HTTP400Error("Missing q parameter");
};

export const checkLoginParams = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) { throw new HTTP400Error("Missing credentials"); }
    if (!req.body.email || !req.body.pwd) { throw new HTTP400Error("Missing credentials"); }
    if (!validatePwd(req.body.pwd) || !validateEmail(req.body.email)) {throw new HTTP400Error("Wrong credentials")}
    return next();
};
