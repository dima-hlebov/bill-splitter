const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Rooms = mongoose.model('Rooms');

// create new room document and add room to user
router.post('/', auth.required, (req, res, next) => {
  const { body: room, payload: { id }} = req;

  if(!room.name) {
    return res.status(422).json({
      error: 'Room name is required'
    });
  }

  room.admin = id;
  return Rooms.create(room)
    .then(newRoom => {
      Users.findByIdAndUpdate(
        id,
        { $push: { rooms: newRoom._id } },
        { new: true, useFindAndModify: false }
      ).catch(e => console.log(e)) 
      return newRoom;
    })
    .then(room => {
        const jsonRoom = {...room.toObject(), isAdmin: true};
        return res.json({ room: jsonRoom });
    });
});

// get all user's rooms
router.get('/', auth.required, (req, res, next) => {
  const { payload: { id }} = req;
  return Users.findById(id)
    .populate("rooms")
    .sort({upadatedAt: -1})
    .then(user => {
      const { rooms } = user.toObject();
      return rooms.map(room => room.admin === id ? {...room, isAdmin: true} : null); 
    })
    .then(rooms => res.json({ rooms }))
    .catch(err => res.status(500).json(err));
});

// delete room document and delete room from array of user's rooms
router.delete('/:roomId', auth.required, (req, res, next) => {
  const { roomId } = req.params
  const { payload: { id: userId }} = req;
  return Rooms.findByIdAndDelete(roomId)
    .then(response => {
      Users.findByIdAndUpdate(
        userId,
        { $pull: { rooms: roomId} },
        { new: true, useFindAndModify: false }
      ).then(response => res.status(200).json(response)).catch(e => console.log(e))
    })
    .catch(err => res.satus(500).json(err))
});

// get chosen room
router.get('/:roomId', auth.required, (req, res, next) => {
  const { roomId } = req.params;
  const { payload: { id: userId }} = req;
  return Rooms.findById(roomId)
    .then(room => {
        const extendedRoom = room.admin === userId ? {...room.toObject(), isAdmin: true} : room
        return res.json({ room: extendedRoom });
      }
    )
    .catch(err => res.status(500).json(err));
});

// add new item
router.post('/:roomId/items', auth.required, (req, res, next) => {
  const { body: newItem, params: { roomId }} = req;

  return Rooms.findByIdAndUpdate(
      roomId,
      { $push: { items: newItem } },
      { new: true, useFindAndModify: false }
    )
    .then(room => res.json({ room }))
    .catch(err => res.status(500).json(err)) 
});

// delete  item
router.delete('/:roomId/items/:itemId', auth.required, (req, res, next) => {
  const { roomId, itemId } = req.params;

  return Rooms.findByIdAndUpdate(
      roomId,
      { $pull: { items: { _id: itemId} } },
      { new: true, useFindAndModify: false }
    )
    .then(room => res.json({ room }))
    .catch(err => res.status(500).json(err)) 
});

module.exports = router;