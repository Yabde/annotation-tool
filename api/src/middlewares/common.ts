import express, {Router} from "express";
import cors from "cors";
// import parser from "body-parser";
import compression from "compression";
import * as databaseConnector from "../utils/data.base.connector"

export const handleCors = (router: Router) => router.use(cors());

// export const handleBodyRequestParsing = (router: Router) => {
//     router.use(parser.urlencoded({limit: '20mb', extended: true, parameterLimit: 100000}));
//     router.use(parser.json({limit: '20mb'}));
// };

// body-parser is built into Express now...
export const allowLargePayload = (router: Router) => {
    router.use(express.urlencoded({limit: '20mb', extended: true, parameterLimit: 100000}));
    router.use(express.json({ limit: '10mb' }))
};

export const handleCompression = (router: Router) => router.use(compression());


export const connectToDataBase = () => {
    console.log('Connecting to database...');
    databaseConnector.dbConnectToPlatform(process.env.ENV);
    console.log('Connected to database.');
};
