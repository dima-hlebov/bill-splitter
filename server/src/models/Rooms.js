const mongoose = require('mongoose');

const {Schema} = mongoose;

const ItemsSchema = new Schema({
  name: String,
  price: Number,
  divideAmoung: Number,
  isPaid: Boolean,
  payees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }]
});

const RoomsSchema = new Schema({
    name: String,
    admin: String,
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }],
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