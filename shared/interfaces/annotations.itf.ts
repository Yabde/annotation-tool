export interface AnnotationItf {
    image_ref: string,
    coord?: ICoordinates[],
    userId: string
}


export interface ICoordinates {
    title: string,
    x1: number,
    x2: number,
    y1: number,
    y2: number
}