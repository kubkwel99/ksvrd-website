import { Request, Response } from 'express';
import { uploadFileToCloudinary } from './../services/cloudinaryService';

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('Žiadny súbor nahratý.');
  }

  try {
    const result = await uploadFileToCloudinary(req.file.path);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error.', error);
    res.status(500).send('Nahranie zlyhalo.');
  }
};
