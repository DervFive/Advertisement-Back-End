
import mongoose from 'mongoose';
import { Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const advertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
},{timestamps:true});

 
advertSchema.plugin(toJSON)

const Advert = mongoose.model('Advert', advertSchema);

export default Advert;
