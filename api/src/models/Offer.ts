import { Document, Schema, Model, model } from "mongoose";
import { OfferItf } from "@shared/interfaces/offer.itf";

interface OfferModel extends OfferItf, Document {
  // May be extended
}

const OfferSchema: Schema = new Schema({
    vehicle: { type: String },
    offer_picto_1: { type: String },
    offer_description_1: { type: String },
    offer_legal_1: { type: String },
    dealer: { type: String }
});

export const Offer: Model<OfferModel> = model<OfferModel>("test", OfferSchema);


