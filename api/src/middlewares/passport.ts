import passport from "passport";
import passportJwt from "passport-jwt";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

export const initPassport = function () {
    const opt = {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
    };
    passport.use(new JwtStrategy(opt,
        function (payload: any, done: any) {
            return Promise.resolve()
            .then(() => {
                //TODO: complete when users properties and access level are set
                const expirationDate = new Date(payload.exp * 1000);
                if (expirationDate.toDateString() === "Invalid Date") {return Promise.reject("Invalid Token")}
                if (expirationDate < new Date()) { return Promise.reject("Token expired"); }
            })
            .then((user) => {
                return done(null, "user");
            })
            .catch((err) => { done(err) });
        }
    ));
};
