import {getPlacesByName} from "./search.controller";
import {checkSearchParams} from "@middlewares/check";

export default [
    {
        path: "/api/search",
        method: "get",
        handler: [checkSearchParams, getPlacesByName]
    }
];
