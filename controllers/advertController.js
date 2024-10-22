// controllers/advert.js
import Advert from '../models/advert.js';

// POST
export const createAdvert = async (req, res) => {
  try {
    const advert = new Advert(req.body);
    await advert.save();
    res.status(201).json(advert);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create advert', error });
  }
};

// GET
export const getAllAdverts = async (req, res) => {
  const { title, category, price } = req.query;
  const query = {};
  if (title) query.title = { $regex: title, $options: 'i' };
  if (category) query.category = category;
  if (price) query.price = { $lte: price };

  try {
    const adverts = await Advert.find(query);
    res.status(200).json(adverts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch adverts', error });
  }
};

// GET
export const getAdvertById = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert) return res.status(404).json({ message: 'Advert not found' });
    res.status(200).json(advert);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch advert', error });
  }
};

//  Update advert
export const updateAdvert = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert) return res.status(404).json({ message: 'Advert not found' });

    // if (advert.vendor.toString() !== req.user.id) {
    //   return res.status(403).json({ message: 'Unauthorized to update this advert' });
    // }
    const updatedAdvert = await Advert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedAdvert);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update advert', error });
  }
};

// DELETE
export const deleteAdvert = async (req, res) => {
  try {
    const adverts = await Advert.findById(req.params.id);
    if (!adverts) return res.status(404).json({ message: 'Advert not found' });

    // if (advert.vendor.toString() !== req.user.id) {
    //   return res.status(403).json({ message: 'Unauthorized to delete this advert' });
    // }

    await Advert.findByIdAndDelete(adverts);
    res.status(200).json({ message: 'Advert deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete advert', error });
  }
};
