const mongoose = require('mongoose');

const {Schema} = mongoose;

const ItemsSchema = new Schema({
  name: String,
  price: Number,
  isPaid: {type: Boolean, default: false},
  divideAmoung: Number,
  payees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }]
});

const Splitters = new Schema({
  splitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  toPay: {
    type: Number,
    default: 0
  },
  splitterPaid: {
    type: Boolean,
    default: false
  } 
  
});

const RoomsSchema = new Schema({
    name: String,
    admin: String,
    splitters: [Splitters],
    items: [ItemsSchema]
}, { timestamps: true });

RoomsSchema.statics.toRoomJSON = function(room) {
    return {
      _id: room._id,
      name: room.name,
      admin: room.admin,
      createdAt: room.createdAt
    };
  };

mongoose.model('Rooms', RoomsSchema);