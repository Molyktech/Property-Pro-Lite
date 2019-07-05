import multer from 'multer';

import Datauri from 'datauri';

import path from 'path';
import {
  uploader,
} from '../config/cloudinaryConfig';


const storage = multer.memoryStorage();

const multerUploads = multer({
  storage,
}).single('image');

const dUri = new Datauri();

// converts the buffer to data url

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(),
  req.file.buffer);

const imageUpload = (req) => {
  const file = dataUri(req).content;
  return uploader.upload(file)
    .then(result => result.url)
    .catch(err => console.log(err));
};
export {
  multerUploads,
  imageUpload,
};
