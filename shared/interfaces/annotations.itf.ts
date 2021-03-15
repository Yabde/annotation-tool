export interface AnnotationItf {
    images_ref: string,
    coordinates: ICoordinates[],
    user_ref: string
}


export interface ICoordinates {
    coord: [],
    image_ref: string,
    user_ref: string
}