import {getHome} from "./home.controller";

export default [
    {
        path: "/api/home",
        method: "get",
        handler:  getHome
    }
];
