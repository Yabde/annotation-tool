import { getAnnotationByUser, uploadImageIntoDb } from "./annotations.controller";


export default [
    {
        path: "/api/annotationsByUser",
        method: "get",
        handler: getAnnotationByUser
    },
    {
        path: "/api/uploadImageIntoDb",
        method: "post",
        handler: uploadImageIntoDb
    },
];