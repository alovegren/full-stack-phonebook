const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

const numberValidator = (number) => {
  if (number.includes('-')) {
    return number.match(/^[0-9]{2,3}-[0-9]+$/);
  }

  return true;
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },

  number: {
    type: String,
    minLength: 8,
    validate: [numberValidator, 'Invalid phone number.'],
  },
});

/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
personSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
/* eslint-enable no-param-reassign */
/* eslint-enable no-underscore-dangle */

module.exports = mongoose.model('Person', personSchema);
