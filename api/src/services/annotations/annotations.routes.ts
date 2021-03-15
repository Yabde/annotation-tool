import { getAnnotationByUser } from "./annotations.controller";


export default [
    {
        path: "/api/annotationsByUser",
        method: "get",
        handler: getAnnotationByUser
    },
];