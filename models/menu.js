const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: String,
    item: {
      type: String,
      price: Number,
    }
  }
});

menuSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;