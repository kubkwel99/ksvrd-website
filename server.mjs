import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import fs from 'fs';

const app = express();

// Setups Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setups Multer & cloudinary
const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './uploads/');
  },
  filename: (_req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});

cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// Function for to cloudinary
const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(file, (_err, res) => {
      resolve({
        res: res.secure_url,
      });
    });
  });
};

const upload = multer({ storage: multerStorage });

app.post('/upload', upload.array('img'), async (req, res, next) => {
  try {
    // Image Handel
    const urls = [];

    let files;
    files = req.files;
    for (const file of files) {
      const { path } = file;

      const newPath = await cloudinaryImageUploadMethod(path);
      urls.push(newPath);
    }

    const multiImage = urls.map((url) => url.res);
    res.status(200).json(multiImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('/', (_req, res) => {
  res.send('Welcome to the Photo Video Album API!');
});

const uploadWithDiskStorage = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, './uploads/');
    },
    filename: (_req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      cb(null, `${Date.now()}.${ext}`);
    },
  }),
});

app.post('/upload-disk', uploadWithDiskStorage.single('file'), (_req, res) => {
  // Handle the uploaded file from disk storage
  res.send('File uploaded with disk storage.');
});

const uploadWithMemoryStorage = multer({ storage: multer.memoryStorage() });

app.post('/upload-memory', uploadWithMemoryStorage.single('file'), (_req, res) => {
  // Handle the uploaded file from memory storage
  res.send('File uploaded with memory storage.');
});

app.post('/upload-large', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    // Upload file to Cloudinary
    const result = await cloudinary.v2.uploader.upload_large(filePath, {
      resource_type: 'auto',
      chunk_size: 6000000,
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Upload failed.');
  } finally {
    // Clean up uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error cleaning up file:', err);
    });
  }
});



// For runnng the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
