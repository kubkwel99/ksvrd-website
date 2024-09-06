import * as cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export const uploadFileToCloudinary = (filePath: string) => {
  return cloudinary.v2.uploader.upload_large(filePath, {
    resource_type: 'auto',
    chunk_size: 6000000, // 6MB
  });
};
