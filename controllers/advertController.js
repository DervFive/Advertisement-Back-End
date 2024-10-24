// controllers/advert.js
import Advert from "../models/advert.js";
import {
  createAdvertValidator,
  updateAdvertValidator,
} from "../validators/advertValidator.js";
import { advertUpload } from "../middlewares/upload.js";

// POST
export const createAdvert = async (req, res) => {
  try {
    // console.log(req.body)
    const { error, value } = createAdvertValidator.validate({ ...req.body, image: req.file?.filename, });
    if (error) {
      return res.status(422).json(error);
    }

    // if validation passes, handle image upload

    // if (req.file) {
    //   const imageUrl = advertUpload.single("image");
    //   value.image = imageUrl;
    // }
    const advert = new Advert({
      ...value,
      user: req.auth.id,
    });
    await advert.save();
    res.status(201).json(advert);
  } catch (error) {
    res.status(500).json({ message: "Failed to create advert", error });
  }
};

// GET
export const getAllAdverts = async (req, res) => {
  try {
    const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;

    const adverts = await Advert.find(JSON.parse(filter))
      .sort(JSON.parse(sort))
      .limit(limit)
      .skip(skip)
      .populate("user", "businessName");
    res.status(200).json(adverts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch adverts", error });
  }
};

// GET
export const getAdvertById = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id).populate(
      "user",
      "businessName"
    );
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }
    res.status(200).json(advert);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch advert", error });
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
      return res.status(422).json(error);
    }

    const updatedAdvert = await Advert.findByIdAndUpdate(
      { _id: req.params.id, user: req.auth.id },
      req.body,
      { new: true }
    );
    if (!updateAdvert)
      return res.status(404).json({ message: "Advert not found" });

    res.status(200).json(updatedAdvert);
  } catch (error) {
    res.status(500).json({ message: "Failed to update advert", error });
  }
};

export const countAdvert = async (req, res) => {
  try {
    const { filter = "{}" } = req.query;
    // count advert in the database
    const count = await Advert.countDocuments(JSON.parse(filter));
    res.status(200).json({ count });
  } catch (error) { }
};

// DELETE
export const deleteAdvert = async (req, res) => {
  try {
    // const adverts = await Advert.findById(req.params.id);
    const adverts = await Advert.findByIdAndDelete({
      _id: req.params.id,
      user: req.auth.id});
    if (!adverts) {
      return res.status(404).json({ message: "Advert not found" });
    }
    res.status(200).json("Advert Deleted");
  } catch (error) {
    res.status(500).json({ message: "Failed to delete advert", error });
  }
};
