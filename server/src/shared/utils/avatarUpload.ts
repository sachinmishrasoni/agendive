import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const avatarUpload = async (localFilePath: string) => {
    try {
        if (!localFilePath) return null;

        // Validate the file type
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
        const mimeType = await getFileMimeType(localFilePath);

        if (!allowedImageTypes.includes(mimeType)) {
            throw new Error('Invalid file type. Only images are allowed.');
        }

        // Upload the image to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'image', // Restrict to image uploads
        });

        console.log('Image uploaded to Cloudinary:', response);

        // Delete the local file after successful upload
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error: any) {
        console.error('Error uploading image to Cloudinary:', error.message);

        // Delete the local file if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

// Helper function to get the MIME type of the file
const getFileMimeType = async (filePath: string): Promise<string> => {
    const fileExtension = path.extname(filePath).toLowerCase();
    switch (fileExtension) {
        case '.jpeg':
        case '.jpg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.webp':
            return 'image/webp';
        default:
            throw new Error('Unsupported file format.');
    }
};

export default avatarUpload;