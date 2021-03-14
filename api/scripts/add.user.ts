import dotEnv from "dotenv";
import * as readline from 'readline'
import { UserModel, User } from "@models/User";
import { dbConnectToPlatform, dbDisconnect } from "@utils/data.base.connector";
import { hashPassword } from "@utils/hash";
import { validateEmail, validatePwd } from "@shared/functions/checks";

dotEnv.config({ path: `./${ process.env.NODE_ENV ? process.env.NODE_ENV : 'dev' }.env` });

registerUser(process.env.NODE_ENV)
.catch((err) => { console.log(err); })
.then(disconnectFromDatabase);

function registerUser(platform?: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let user: UserModel = new User();
  let rawPwd: string;

  return Promise.resolve()
  .then(connectToDB)
  .then(getUserCredentials)
  .then(storeUserInDatabase)
  .then(() => console.log("done"));

  function connectToDB() { return dbConnectToPlatform(platform); }

  function getUserCredentials() {
    return Promise.resolve()
    .then(getUserEmail)
    .then(getUserPassword)
    .catch((err) => { return Promise.reject(err); })
    .then(() => rl.close());

    function getUserEmail() {
      return new Promise((resolve, reject) => {
        rl.question('user email ?\n', (answer) => {
          user.email = answer;
          return resolve()
        });
      })
    }

    function getUserPassword() {
      return new Promise((resolve, reject) => {
        rl.question('user password ?\n', (answer) => {
          rawPwd = answer;
          user.pwd = hashPassword(answer);
          return resolve()
        });
      })
    }
  }

  function storeUserInDatabase() {
    if (!validatePwd(rawPwd)) { return Promise.reject('wrong password') }
    if (!validateEmail(user.email)) { return Promise.reject('Wrong Email') }
    return user.save()
  }
}

function disconnectFromDatabase() { return dbDisconnect() }
