
import mongoose from 'mongoose';

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
//   category: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//   vendor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
  
});

const Advert = mongoose.model('Advert', advertSchema);

export default Advert;
