import mongoose from 'mongoose';
const { Schema } = mongoose;

const locationSchema = new Schema({
  id: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  bookings:[
    {
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      }
    }
  ],
  numberOfBeds: Number
});

export const Location = mongoose.model('location', locationSchema);
