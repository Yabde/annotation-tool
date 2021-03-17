import http from "http";
import path from "path";
import dotEnv from "dotenv";
import routes from "./services";
import middleware from "./middlewares";
import errorHandlers from "./middlewares/error.handlers";
import express, {Request, Response, NextFunction} from "express";
import {applyMiddleware, applyRoutes} from "@utils/routing.utils";

dotEnv.config();
dotEnv.config({path: `./${process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'}.env`});

process.on("uncaughtException", exception => {
    console.log(exception);
    process.exit(1);
});

process.on("unhandledRejection", exception => {
    console.log(exception);
    process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
loadFront();
applyMiddleware(errorHandlers, router);

function loadFront(): void {
    router.use(express.static(path.resolve("./../front/build")));
    router.get('/*', function (req: Request, res: Response, next: NextFunction) {
        if (!req.url.includes('api')) {return res.sendFile(path.resolve("./../front/build/index.html"));}
        return next()
    });
}

const {PORT = 3001} = process.env;
const server = http.createServer(router);

server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
