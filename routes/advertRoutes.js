// // routes/advert.js
// import express from 'express';
// import { createAdvert, getAllAdverts, getAdvertById, updateAdvert, deleteAdvert } from '../controllers/advert.js';
// import upload from '../middleware/upload.js';
// import { verifyVendor } from '../middleware/auth.js';

// const router = express.Router();


// router.post('/', verifyVendor, upload, createAdvert);

// router.get('/', getAllAdverts);

// router.get('/:id', getAdvertById);

// router.patch('/:id', verifyVendor, upload, updateAdvert);

// router.delete('/:id', verifyVendor, deleteAdvert);

// export default router;


// routes/advert.js
import express from 'express';
import { Router } from 'express';
import { 
  createAdvert, 
  updateAdvert, 
  deleteAdvert, 
  getAdvertById,
  getAllAdverts,
  countAdvert
} from '../controllers/advertController.js';
import { hasPermission, isAuthentication } from '../middlewares/auth.js';
import { advertUpload } from '../middlewares/upload.js';

const advertRouter = Router();

advertRouter.get('/adverts/count',countAdvert)
advertRouter.get('/advert',getAllAdverts );

advertRouter.get('/advert/:id',getAdvertById );



// Protect route
advertRouter.post('/advert',isAuthentication,hasPermission('add_advert'),advertUpload.single('image'), createAdvert);

advertRouter.patch('/advert/:id',isAuthentication,hasPermission('update_advert'),advertUpload.single('image'), updateAdvert);

advertRouter.delete('/advert/:id',isAuthentication,hasPermission('delete_advert'), deleteAdvert);

export default advertRouter;

