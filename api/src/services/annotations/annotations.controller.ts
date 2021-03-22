import { NextFunction, Request, Response } from "express";
import { Annotation } from "@models/Annotation";
import { HTTP400Error } from "@utils/http.errors";
import { BlobServiceClient } from "@azure/storage-blob";
import getStream from 'into-stream';
import mongoose from 'mongoose';
import { User } from "@models/User";

export async function getAnnotationByUser(req: Request, res: Response): Promise<void> {
    let userId = req.params.userId;

    // User.findById(id).then((user) => {
    //     res.status(200).send(user);
    // })
    // .catch(err => {
    //     console.log(err);
    // }) 
}

export async function getImageFromDb(req: Request, res: Response, next: NextFunction): Promise<any> {
    console.log('getImageFromDb');
    const imageIds = await User.find({}, '_id imagesId');

    console.log('Images ID : ', imageIds[0]);

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING ? process.env.AZURE_STORAGE_CONNECTION_STRING : '');
    const containerName = 'blob-container';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // console.log("Listing all blobs using iter");
    // let i = 1;
    // let iter = containerClient.listBlobsFlat();
    // for await (const blob of iter) {
    //   console.log(blob);
    // }

    let result = [];
    for await (const item of containerClient.listBlobsByHierarchy("/", { prefix: 'images/'})) {
        if (item.kind === "prefix") {
          console.log(`\tBlobPrefix: ${item.name}`);
          result.push(item.name)
        } else {
          console.log(`\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`);
        }
      } 


    return res.status(200).send(imageIds[0]);
}

async function generateSasToke(resourceUri: any, signingKey: any, policyName: any, expiresInMins: any) {

}

export async function deleteBlobByName(req: Request, res: Response, next: NextFunction) {
    console.log('deleteBlobByName');

    let blobName = req.body.name;
    const containerName = 'blob-container';

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING ? process.env.AZURE_STORAGE_CONNECTION_STRING : '');
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    // Get blob content from position 0 to the end
    // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
    const response = await blobClient.deleteIfExists();
    console.log(response.requestId)
    return res.status(200).send({requestId: response.requestId});
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

            // TODO : add name of file in Mongodb to 

    } catch (err) {
        console.log(`BUG`, uploadBlobResponse.requestId);
    }
}