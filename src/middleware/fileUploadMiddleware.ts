import multer from 'multer';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const fileFilter: any = (
  _req: any,
  file: { mimetype: string },
  cb: (arg0: null, arg1: boolean) => void
) => {


  const acceptedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/mp4',
    'video/mkv',
    'video/webm',
  ];

  if (acceptedMimeTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(null, false); 
  }
};


export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // File size limit (100Mb)
});
