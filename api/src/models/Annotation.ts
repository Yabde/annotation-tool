import { Document, Schema, Model, model } from "mongoose";
import { AnnotationItf } from "@shared/interfaces/annotations.itf";

interface AnnotationModel extends AnnotationItf, Document {
    // May be extended
  }
  
  const AnnotationSchema: Schema = new Schema({
      vehicle: { type: String },
      offer_picto_1: { type: String },
      offer_description_1: { type: String },
      offer_legal_1: { type: String },
      dealer: { type: String }
  });
  
  export const Annotation: Model<AnnotationModel> = model<AnnotationModel>("Annotation", AnnotationSchema);
  
  