// middleware/advert.js
import Advert from '../models/advert.js';


export const checkAdvertExists = async (req, res, next) => {
  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert) {
      return res.status(404).json({ message: 'Advert not found' });
    }
    req.advert = advert;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error finding advert', error });
  }
};

export const verifyAdvertOwner = (req, res, next) => {
  if (req.advert.vendor.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized action. You do not own this advert.' });
  }
  next();
};
