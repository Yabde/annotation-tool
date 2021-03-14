import { getUsers } from "./users.controller";
import { getUserById } from "./users.controller";
import { addUser } from './users.controller';
import { updateUser } from './users.controller';
import { deleteUserById } from './users.controller';

import { checkLoginParams } from "@middlewares/check";

export default [
    {
        path: "/api/users",
        method: "get",
        handler: getUsers
    },
    {
        path: "/api/users/:id",
        method: "get",
        handler: getUserById
    },
    {
        path: "/api/add-user",
        method: "post",
        handler: [checkLoginParams, addUser]
    },
    {
        path: "/api/users/:id",
        method: "put",
        handler: updateUser 
    },
    {
        path: "/api/users/:id/delete",
        method: "delete",
        handler: deleteUserById 
    }
];