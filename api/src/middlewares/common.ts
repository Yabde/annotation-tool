import express, {Router} from "express";
import cors from "cors";
// import parser from "body-parser";
import compression from "compression";
import * as databaseConnector from "../utils/data.base.connector"

export const handleCors = (router: Router) => {
    const whitelist: Array<string> = [
        "https://predictive-annotation-tool.azurewebsites.net",
    ];

    if (process.env.NODE_ENV === 'dev') { whitelist.push('http://localhost', 'http://localhost:4200', 'http://localhost:3000', 'http://localhost:3006', 'http://localhost:8100', 'capacitor://localhost') }
    var corsOptionsDelegate = {
    origin: function (origin: any, callback: any) {
        if (!origin) return callback(null, true);
        if (whitelist.indexOf(origin) === -1) {
        var msg = 'The request as been blocked by CORS policy.';
        return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
    };

    router.use(cors(corsOptionsDelegate));
};

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
