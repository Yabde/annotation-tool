import {NextFunction, Request, Response} from "express";
import {UserModel, User} from "@models/User";
import {HTTP400Error} from "@utils/http.errors";
import {hashPassword} from "@utils/hash";
import {generateToken} from "@utils/token.generator";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {

    let dataBaseUser: UserModel;
    let user: UserModel;

    return Promise.resolve()
    .then(getDataBaseUser)
    .then(setConnectionDate)
    .then(generateUserToken)
    .then(() => {res.status(200).send(user)})
    .catch((err) => next(err));

    function getDataBaseUser(): Promise<void> {
        const hashed_pwd = hashPassword(req.body.pwd);
        return User.find({email: req.body.email.toLowerCase(), pwd: hashed_pwd})
        .then((user) => {
            if (user.length === 0 || !user) {throw new HTTP400Error("Wrong credentials")}
            dataBaseUser = user[0].toJSON();
        })
    }

    function generateUserToken(): void {
        user = dataBaseUser;
        user.token = generateToken(dataBaseUser);
        console.log('user Token : ', user);
    }


  function setConnectionDate(): Promise<void> {
    return User.updateOne({ _id: dataBaseUser._id }, { $set: { "last_connection": new Date() } }).then(() => { })
  }
}
