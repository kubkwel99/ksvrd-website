import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
 });

export const getAllMedia = async () => {
   try {
     const response = await cloudinary.api.resources({
       type: 'upload',
       resource_type: 'video',
       max_results: 100,
     });
     return response.resources;
   } catch (error) {
     console.error('Error fetching media from Cloudinary:', error);
     return [];
   }
 };
