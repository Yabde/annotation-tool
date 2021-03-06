import { NextFunction, Request, Response } from "express";
import { BlobServiceClient } from "@azure/storage-blob";
import getStream from 'into-stream';
import { User, UserModel } from "@models/User";
const { v4: uuidv4 } = require('uuid');

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

    let imagesName = [];
    for await (const item of containerClient.listBlobsByHierarchy("/", { prefix: 'images/'})) {
        // console.log(`\tBlobItem: name - ${item.name}`);
        imagesName.push(item.name)
    }
    console.log('images Name : ', imagesName);

    const idArray: string[] | undefined =  imageIds[0].imagesId;
    let idArrayFiltered = imagesName.filter((e) => {
        const name = e.split('/')[1];
        return idArray!.indexOf(name) !== -1;
    })

    let result: Object[] = [];
    idArrayFiltered.forEach((v, idx) => {
        result.push({
            url: v + process.env.AZURE_TOKEN_SAS,
            id: v.split('/')[1]
        })
    })
    console.log('result : ', result);

    return res.status(200).send(result);
}

export async function getImageById(req: Request, res: Response, next: NextFunction) {
    console.log('getImageById');

    let imageId = req.body.imageId;
    // console.log('PARAMS single URL : ', imageId);

    // let imageUrl = await User.find({ imagesId: imageId }, '_id imagesId');

    // console.log('SINGLE image URL : ', imageUrl);

    let imageUrl = 'images/' + imageId + process.env.AZURE_TOKEN_SAS;

    return res.status(200).send({imageUrl: imageUrl});
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
    // console.log('USER ID : ', req.body.userId);

    return Promise.resolve().then(async () => {
        
        if (req.body.image) {
            const newName: string = uuidv4();
            // uploadImageIntoBlob(req.body.image, new mongoose.Types.ObjectId().toString());
            uploadImageIntoBlob(req.body.image, 'images/' + newName);

            await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {imagesId: newName} }, (err, res) => {
                    if (err) console.log(err);
                });
                
            res.status(201).send('uploaded');
        }
        res.status(400);  
    })
    .catch((err) => {
        console.log('ERROR !!! ', err);
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
    const blockBlobClient = containerClient.getBlockBlobClient(`${name}`);
    const uploadBlobResponse = await blockBlobClient.upload(buffer, buffer.length);

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