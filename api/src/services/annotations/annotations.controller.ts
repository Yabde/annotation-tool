import { NextFunction, Request, Response } from "express";
import { Annotation, AnnotationModel  } from "@models/Annotation";
import { HTTP400Error } from "@utils/http.errors";
import { BlobServiceClient } from "@azure/storage-blob";
import getStream from 'into-stream';
import mongoose from 'mongoose';

export async function getAnnotationByUser(req: Request, res: Response): Promise<void> {
    let userId = req.params.userId;

    // User.findById(id).then((user) => {
    //     res.status(200).send(user);
    // })
    // .catch(err => {
    //     console.log(err);
    // }) 
}

export async function uploadImageIntoDb(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('uploadImageIntoDB');

    // console.log('req : ', req.body);
    // console.log(req.body.image);

    return Promise.resolve().then(() => {
        
        if (req.body.image) {
            uploadImageIntoBlob(req.body.image, new mongoose.Types.ObjectId().toString());
        }
        res.status(201).send('caca');
    })
    .catch((err) => {
        console.log('ERRORE !!! ', err);
        next(err);
    });
}

async function uploadImageIntoBlob(imageBuffered: any, name: string) {
    console.log('name : ', name);
    const matches = imageBuffered.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const type = matches[1];
    const format = type.split('/')[1];
    const buffer = Buffer.from(matches[2], 'base64');

    const ONE_MEGABYTE = 1024 * 1024;
    const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING ? process.env.AZURE_STORAGE_CONNECTION_STRING : '');
    
    const containerName = 'blob-container';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const stream = getStream(buffer);
    console.log('stream : ', stream);
    const blockBlobClient = containerClient.getBlockBlobClient(`${name}`);
    console.log('blockblobclient : ', blockBlobClient);
    const uploadBlobResponse = await blockBlobClient.upload(buffer, buffer.length);
    console.log('uploadblobresponse : ', uploadBlobResponse);

    try {
        await blockBlobClient.uploadStream(stream,
            uploadOptions.bufferSize, uploadOptions.maxBuffers,
            { blobHTTPHeaders: { blobContentType: type } });
            console.log(`Upload block blob successfully`, uploadBlobResponse.requestId);
    } catch (err) {
        console.log(`BUG`, uploadBlobResponse.requestId);
    }
}