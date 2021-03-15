import { Request, Response } from "express";
import { Annotation, AnnotationModel  } from "@models/Annotation";
import { HTTP400Error } from "@utils/http.errors";

export async function getAnnotationByUser(req: Request, res: Response): Promise<void> {
    let userId = req.params.userId;

    // User.findById(id).then((user) => {
    //     res.status(200).send(user);
    // })
    // .catch(err => {
    //     console.log(err);
    // }) 
}
