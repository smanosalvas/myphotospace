const path = require('path');
const {Storage} = require('@google-cloud/storage');
const { config } = require('../config');
const fs = require('fs');
const util = require('util');

const storage = new Storage();

async function uploadImageToGCPStorage(file) {
    //Upload file to Google Storage
    console.log('Sending file to GCP')
    console.log(file)
    
    const bucket = storage.bucket(config.bucket);

    return await bucket.upload(path.join('../backend/uploads', file.originalname), {
        destination: file.originalname
    })
}

//TODO: Add userId to get images by user
async function getAllImagesByUser() {
    const bucket = storage.bucket(config.bucket);

    //Read all files in bucket
    const listFiles = await bucket.getFiles();
    listFiles[0].forEach(file => console.log(file.name));
    //Download all images to local storage and send to the client
    const readFile = util.promisify(fs.readFile);
    const response = []

    await Promise.all(
        await listFiles[0].map(async (file) => 
            {
                const filePath = `./downloads/${file.name}`;
                if(!fs.existsSync(filePath)){
                    await file.download({destination: filePath})
                }
                const fileContent = await readFile(filePath)
                const buffer = Buffer.from(fileContent, 'base64')
                response.push({
                    fileName: file.name,
                    content: buffer.toString('base64')
                })
            }
        )
    );  

    return response;
}


module.exports = {
    uploadImageToGCPStorage,
    getAllImagesByUser
}