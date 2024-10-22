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
  getAllAdverts
} from '../controllers/advertController.js';
// import { checkAdvertExists, verifyAdvertOwner } from '../middleware/advert.js';
// import { verifyVendor } from '../middleware/'; // Assumed middleware for verifying vendor

const advertRouter = Router();

// POST: Create a new advert (Only vendors can create adverts)
advertRouter.post('/advert', createAdvert);

// GET: Get all adverts (Accessible by all users)
advertRouter.get('/advert',getAllAdverts );

// GET: Get advert details by ID (Accessible by all users)
advertRouter.get('/advert/:id',getAdvertById );

// PUT: Update an advert (Only vendors can update their own adverts)
advertRouter.patch('/advert/:id', updateAdvert);

// DELETE: Delete an advert (Only vendors can delete their own adverts)
advertRouter.delete('/advert/:id', deleteAdvert);

export default advertRouter;

