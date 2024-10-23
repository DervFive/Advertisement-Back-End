// controllers/advert.js
import Advert from '../models/advert.js';
import { createAdvertValidator, updateAdvertValidator } from '../validators/advertValidator.js';


// POST
export const createAdvert = async (req, res) => {
  try {
    const { error, value } = createAdvertValidator.validate({
      ...req.body,
      image: req.file?.filename,
    });
    if (error) {
      return res.status(422).json(error);
    }
    const advert = new Advert({
      ...value,
      createBy: req.auth.id
    });
    await advert.save();
    res.status(201).json(advert);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create advert', error });
  }
};


// GET
export const getAllAdverts = async (req, res) => {
  try {
    const { filter = "{}",sort= '{}',limit =10,skip=0}=req.query

    const adverts = await Advert
    .find(JSON.parse(filter))
    .sort(JSON.parse(sort))
    .limit(limit)
    .skip(skip).populate('createdBy','userName');
    res.status(200).json(adverts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch adverts', error });
  }
};


// GET
export const getAdvertById = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id).populate('createdBy','userName');
    if (!advert){
      return res.status(404).json({ message: 'Advert not found' });
    } 
    res.status(200).json(advert);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch advert', error });
  }
};


//  Update advert
export const updateAdvert = async (req, res) => {
  try {
    const { error, value } = updateAdvertValidator.validate({
      ...req.body,
      image: req.file?.filename,
    });
    if (error) {
      return res.status(422).json(error)
    }
    const updatedAdvert = await Advert.findByIdAndUpdate({ _id: req.params.id, user: req.auth.id }, { new: true });
    if (!updateAdvert) return res.status(404).json({ message: 'Advert not found' });

    res.status(200).json(updatedAdvert);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update advert', error });
  }
};

export const countAdvert = async (req,res)=>{
  try {
    const {filter ="{}"}= req.query
    // count advert in the database 

    const count = await Advert.countDocuments(JSON.parse(filter))
    res.status(200).json({count})
  } catch (error) {
    
  }
}




// DELETE
export const deleteAdvert = async (req, res) => {
  try {
    const adverts = await Advert.findById(req.params.id);
    if (!adverts) {

      return res.status(404).json({ message: 'Advert not found' });
    }
    await Advert.findByIdAndDelete(adverts);
    res.status(200).json({ message: 'Advert deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete advert', error });
  }
};
