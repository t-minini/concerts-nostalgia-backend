import { Schema, model } from 'mongoose';

const concertSchema = Schema(
  {
    tour: {
      type: String,
      required: [false, 'Please, enter concert!'],
    },
    artist: {
      type: String,
      required: [false, 'Please, enter artist!'],
    },
    year: {
      type: Number,
      required: [false, 'Please, enter concert date!'],
    },
    location: {
      type: String,
      required: [false, 'Please, enter location!'],
    },
    city: {
      type: String,
      required: [false, 'Please, enter city!'],
    },
    country: {
      type: String,
      required: [false, 'Please, enter country!'],
    },
    companion: [
      {
        type: String,
        required: false,
        default: 'Alone',
      },
    ],
    rating: {
      type: Number,
      required: [false, 'Please, enter rating!'],
      enum: [1, 2, 3, 4, 5],
    },
    images: {
      type: String,
      required: false,
    },
    background: {
      type: String,
      required: false,
      enum: [
        'background-one',
        'background-two',
        'background-three',
        'background-four',
        'background-five',
      ],
    },
  },
  {
    timestamps: true,
  }
);

const ConcertModel = model('Concert', concertSchema);

export default ConcertModel;

// THIS CODE: DEFINES A MONGOOSE SCHEMA FOR STORING THE CONCERT DATA IN THE MONGODB DATABASE, CREATES A MODEL BASED ON THE SCHEMA, AND EXPORTS THE MODEL.
