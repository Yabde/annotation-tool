import * as commonFunctions from "./common";
import {initPassport} from "./passport";
import {handleAPIDocs} from "./api.docs";

export default [
    commonFunctions.handleCors,
    // commonFunctions.handleBodyRequestParsing,
    commonFunctions.allowLargePayload,
    commonFunctions.handleCompression,
    commonFunctions.connectToDataBase,
    handleAPIDocs,
    initPassport
];
