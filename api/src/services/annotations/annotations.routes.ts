import { getAnnotationByUser, uploadImageIntoDb, getImageFromDb, getImageById } from "./annotations.controller";


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
    },
    {
        path: "/api/getImageById",
        method: "post",
        handler: getImageById
    }
];