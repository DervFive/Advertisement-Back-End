 
// // middleware/upload.js
// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(savefiles.org);
//     cb(null, `${Date.now()}-${savefiles.org}${ext}`);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png|gif/;
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimeType = fileTypes.test(file.mimetype);

//     if (extname && mimeType) {
//       return cb(null, true);
//     } else {
//       cb('Error: Images only!');
//     }
//   },
// }).single('image');

// export default upload;

import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const upload  = multer({
    storage :multerSaveFilesOrg({
        apiAccessToken:process.env.SAVEFILESORG_API_KEY,
        relativePath:'/Advertisements/profile_Picture/*',
    }),
    preservePath:true
})
export const advertUpload  = multer({
    storage :multerSaveFilesOrg({
        apiAccessToken:process.env.SAVEFILESORG_API_KEY,
        relativePath:'/Advertisements/Adverts/*',
    }),
    preservePath:true
})

