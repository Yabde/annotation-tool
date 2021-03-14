import {Response, NextFunction} from "express";
import {HTTPClientError, HTTP404Error} from "./http.errors";

export const notFoundError = () => { throw new HTTP404Error("Method not found."); };

export const clientError = (err: Error, res: Response, next: NextFunction) => {
    console.warn(err);
    if (err instanceof HTTPClientError) { return res.status(err.statusCode).send(err.message); }
    return next(err);
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
    console.error(err);
    if (process.env.NODE_ENV === "production") { return res.status(500).send("Internal Server Error"); }
    return res.status(500).send(err.stack);
};
