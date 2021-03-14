import {login} from "./login.controller";
import rateLimit from "express-rate-limit";
import {checkLoginParams} from "@middlewares/check";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many connexions attempts"
});

export default [
    {
        path: "/api/login",
        method: "post",
        handler: [limiter, checkLoginParams, login]
    }
];
