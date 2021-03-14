import { getOffers } from "./offers.controller";
import { getOfferByOfferId } from "./offers.controller";

export default [
    {
        path: "/api/offers",
        method: "get",
        handler: getOffers
    },
    {
        path: "/api/offers/:id",
        method: "get",
        handler: getOfferByOfferId
    }
];
