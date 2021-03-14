import {getPlaces} from "./providers/open.cage.data.provider";
import {Request, Response} from "express";

export async function getPlacesByName(req: Request, res: Response): Promise<void> {
    // const result = await getPlaces(req.query.q);
    // const result = await getPlaces(req.query);
    // res.status(200).send(result);
}
