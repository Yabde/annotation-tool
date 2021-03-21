import { Request, Response } from "express";
import { User, UserModel } from "@models/User";
import { hashPassword } from "@utils/hash";
import { HTTP400Error } from "@utils/http.errors";


export async function getUsers(req: Request, res: Response): Promise<void> {
    User.find({}).then((users) => {
        res.status(200).send(users);
    })   
}

export async function getUserById(req: Request, res: Response): Promise<void> {
    console.log('getUserById');
    let id = req.params.id;

    User.findById(id).then((user) => {
        res.status(200).send(user);
    })
    .catch(err => {
        console.log(err);
    }) 
}

export async function addUser(req: Request, res: Response): Promise<void> {
    let newUser: UserModel = new User(req.body);
    if (newUser.pwd) {
        newUser.pwd = hashPassword(newUser.pwd);
    }

    newUser.save((err, user) => {
        if(err)  {
            console.log("err : ", err);
        } else {
            res.status(201).json(user);
        }
    });
}

export async function updateUser(req: Request, res: Response) {
    let updateUser = req.body;

    User.updateOne({ _id: req.params.id }, { $set: updateUser }, (err, data) => {
        if (err) { 
            res.send(err); 
        } else {
            res.status(200).json(updateUser);
        }
    });
}

export async function deleteUserById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    User.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(id);
        }
    });   
}