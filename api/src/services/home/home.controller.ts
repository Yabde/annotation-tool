import {Request, Response} from "express";

export async function getHome(req: Request, res: Response): Promise<void> {
    res.status(200).send("API non fontionnel");
}
