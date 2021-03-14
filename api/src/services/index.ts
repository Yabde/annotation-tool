import searchRoutes from "./search/search.routes";
import homeRoutes from "./home/home.routes";
import loginRoutes from "./login/login.routes";
import offersRoutes from "./offers/offers.routes";
import usersRoutes from "./users/users.routes";

export default [
    ...searchRoutes, 
    ...homeRoutes, 
    ...loginRoutes, 
    ...offersRoutes,
    ...usersRoutes
];
