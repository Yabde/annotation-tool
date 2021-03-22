import { getAnnotationByUser, uploadImageIntoDb, getImageFromDb } from "./annotations.controller";


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
    {
        path: "/api/getImageFromDb",
        method: "get",
        handler: getImageFromDb
    }
];