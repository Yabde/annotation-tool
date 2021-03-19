import { Document, Schema, Model, model } from 'mongoose';
import { AnnotationItf } from '@shared/interfaces/annotations.itf';

interface AnnotationModel extends AnnotationItf, Document {
  // May be extended
}

const CoordinatesSchema: Schema = new Schema({
  title: String,
  x1: Number,
  x2: Number,
  y1: Number,
  y2: Number,
});

const AnnotationSchema: Schema = new Schema({
  image_ref: String,
  coord: [CoordinatesSchema],
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Annotation: Model<AnnotationModel> = model<AnnotationModel>(
  'Annotation',
  AnnotationSchema
);
