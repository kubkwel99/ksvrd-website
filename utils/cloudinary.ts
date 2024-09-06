import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
   cloud_name: "ksvrd",
   api_key: "282896759172175",
   api_secret: "ueBz9aiNygCK8PZlbCCfwVQ5nIw",
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
 