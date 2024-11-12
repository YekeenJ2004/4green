import { MongoClient, GridFSBucket } from 'mongodb'
import dotenv from 'dotenv';
import fs from 'fs';


dotenv.config();

export const connectToDB = async () =>{
    const connection = {}
    try {
        if (connection.isConnected) return 
        const db =  await mongoose.connect(process.env.MONGO);
        connection.isConnected  = db.connections[0].readyState
        return db
    } catch (error) {
        console.log('could not connect to db', error)
    }
}

// Function to store the image in GridFS
export const saveImageToGridFS = async (fileName, imageUri) => {
    try {
        db = connectToDB()
        const bucket = new GridFSBucket(db, { bucketName: 'images' });
        // Convert the image data to a readable stream
        const response = await fetch(imageUri);
        const readableStream = response.body;

        // Upload stream to GridFS
        const uploadStream = bucket.openUploadStream(fileName, {
            metadata: { contentType: 'image/jpeg' },
        });

        readableStream.pipe(uploadStream);

        uploadStream.on('finish', () => {
            console.log('Image successfully stored in GridFS');
        });
    } catch (error) {
        console.error('Error saving image to GridFS:', error);
    }
};

// Function to retrieve and serve the image
export const getImageFromGridFS = async (fileName, res) => {
    try {
        db = connectToDB()
        const bucket = new GridFSBucket(db, { bucketName: 'images' });
        const downloadStream = bucket.openDownloadStreamByName(fileName);

        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });

        downloadStream.on('end', () => {
            res.end();
        });

        downloadStream.on('error', (error) => {
            console.error('Error retrieving image from GridFS:', error);
            res.status(500).send('Error retrieving image');
        });

        res.set('Content-Type', 'image/jpeg'); // Set the appropriate content type for your image
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(404).send('Image not found');
    }
};