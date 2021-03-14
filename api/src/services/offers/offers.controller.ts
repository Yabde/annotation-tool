import { Request, Response } from "express";
import { Offer } from "@models/Offer";

export async function getOffers(req: Request, res: Response): Promise<void> {

    Offer.find({})
        .then((offers) => {
            res.status(200).send(offers);
        })

}

export async function getOfferByOfferId(req: Request, res: Response): Promise<void> {
    var id = req.params.id;
    Offer.findById(id)
        .then((offers) => {
            res.status(200).send(offers);
        })
        .catch(err => {console.log(err);})


}
