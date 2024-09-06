import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllMedia } from './../../../utils/cloudinary';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const media = await getAllMedia();
  res.status(200).json(media);
}
