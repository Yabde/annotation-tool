import {Router} from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import * as databaseConnector from "../utils/data.base.connector"

export const handleCors = (router: Router) => router.use(cors());

export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({extended: true}));
    router.use(parser.json());
};

export const handleCompression = (router: Router) => router.use(compression());

export const connectToDataBase = () => {
    console.log('Connecting to database...');
    databaseConnector.dbConnectToPlatform(process.env.ENV);
    console.log('Connected to database.');
};
