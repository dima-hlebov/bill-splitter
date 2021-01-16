const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const { response } = require('express');
const Users = mongoose.model('Users');
const Rooms = mongoose.model('Rooms');

// create new room document, add room to user, add admin to members
router.post('/', auth.required, (req, res, next) => {
  const { body: room, payload: { id }} = req;

  if(!room.name) {
    return res.status(422).json({
      error: 'Room name is required'
    });
  }

  room.admin = id;
  room.members = [id];

  return Rooms.create(room)
    .then(newRoom => {
      Users.findByIdAndUpdate(
        id,
        { $push: { rooms: newRoom._id } },
        { new: true, useFindAndModify: false }
      )
      .catch(err =>  res.status(500).json(err))

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
      return rooms.map(room => room.admin === id ? {...room, isAdmin: true} : {...room});
    })
    .then(rooms => res.json({ rooms }))
    .catch(err => res.status(500).json(err));
});

// delete room document and delete room from array of user's rooms
router.delete('/:roomId', auth.required, (req, res, next) => {
  const { roomId } = req.params
  const { payload: { id: userId }} = req;
  return Rooms.findById(roomId)
    .then(room => {
      if(room.admin === userId){
        return Rooms.findByIdAndDelete(roomId)
          .then(response => {
            return Users.findByIdAndUpdate(
              userId,
              { $pull: { rooms: roomId} },
              { new: true, useFindAndModify: false }
            ).then(response => res.status(200).json(response)).catch(e => res.status(500).json(e))
          })
          .catch(err => res.satus(500).json(err))
      }
      return Users.findByIdAndUpdate(
          userId,
          { $pull: { rooms: roomId} },
          { new: true, useFindAndModify: false }
        ).then(response => res.status(200).json(response)).catch(e => res.status(500).json(e))
    })
  
});

// get chosen room
router.get('/:roomId', auth.required, (req, res, next) => {
  const { roomId } = req.params;
  const { payload: { id: userId }} = req;
  return Rooms.findById(roomId)
    .populate("members")
    .populate({
      path: "items",
      populate: {
        path: "payees"
      }
    })
    .then(room => {
        const roomObj = room.toObject();

        let sum = 0;
        roomObj.items.map((item, i )=> {
          if(item.payees.filter(payee => payee._id.toString() === userId).length > 0){
            sum+=item.price/item.divideAmoung;
          }
        });

        const extendedRoom = room.admin === userId ? {...roomObj, isAdmin: true, sum} : {...roomObj, sum}
        return res.json({ room: extendedRoom });
      }
    )
    .catch(err => res.status(500).json(err));
});

// invite
router.put('/:roomId/invite', auth.required, (req, res, next) => {
  const { params: { roomId }, payload: { id: userId }} = req;

  return Users.findById(userId)
    .then(user => {
      if(!user.rooms.includes(roomId)){
        return Users.findByIdAndUpdate(
          userId,
          { $push: { rooms: roomId } },
          { new: true, useFindAndModify: false }
        )
        .then(() => {
          Rooms.findById(roomId)
            .then(room => {
              if(!room.members.includes(userId)){
                return Rooms.findByIdAndUpdate(
                  roomId,
                  { $push: { members: userId } },
                  { new: true, useFindAndModify: false }
                )
                .then(response => res.status(200).json(room))
              }
              return res.status(200).json(room)
            })          
        })
        .catch(err =>  res.status(500).json(err))
      }
    })
    .catch(err => res.status(400).json(err))
});

// add new item
router.post('/:roomId/items', auth.required, (req, res, next) => {
  const { body: newItem, params: { roomId }, payload: { id: userId }} = req;
  
  const itemWRoundedPrice = {
    ...newItem,
    price: +newItem.price.toFixed(2)
  }

  return Rooms.findById(roomId)
  .then(room =>{
    if (room.admin === userId){
      return Rooms.findByIdAndUpdate(
        roomId,
        { $push: { items: itemWRoundedPrice } },
        { new: true, useFindAndModify: false }
      )
      .then(room => res.json({ room }))
      .catch(err => res.status(500).json(err))
    }

    let err = new Error('Permission to add item denied')
    return res.status(403).json(err);
  });
});

// delete item
router.delete('/:roomId/items/:itemId', auth.required, (req, res, next) => {
  const { params: {roomId, itemId}, payload: { id: userId }} = req;
  return Rooms.findById(roomId)
    .then(room =>{
      if (room.admin === userId){
        return Rooms.findByIdAndUpdate(
          roomId,
          { $pull: { items: { _id: itemId} } },
          { new: true, useFindAndModify: false }
        )
        .then(room => res.json({ room }))
        .catch(err => res.status(500).json(err))
      }
      return res.status(403).json('Permission to delete item denied');
    })
    .catch(err => res.status(500).json(err))
});

// add payee for an item
router.post('/:roomId/items/:itemId/payee', auth.required, (req, res, next) => {
  const { params: {roomId, itemId}, payload: { id: userId } } = req;
  return Rooms.findById(
    roomId,
    {items: { $elemMatch: { _id: itemId}}}
    )
    .then(response => {
      if(response.items[0].payees.length !== response.items[0].divideAmoung && !response.items[0].payees.includes(userId)){
        return Rooms.findByIdAndUpdate(
            roomId,
            { $push: { "items.$[i].payees": userId } },
            { "arrayFilters": [{"i._id": mongoose.Types.ObjectId(itemId)}], new: true, useFindAndModify: false},
          )
          .then(room => res.json({ room }))
          .catch(err => res.status(500).json(err))
      }
      return res.status(403).json('Item has been taken already');
    })
    .catch(err => res.status(500).json(err))

});

// remove payee from an item
router.delete('/:roomId/items/:itemId/payee', auth.required, (req, res, next) => {
  const { params: {roomId, itemId}, payload: { id: userId } } = req;

  return Rooms.findByIdAndUpdate(
      roomId,
      { $pull: { "items.$[i].payees": userId }},
      { "arrayFilters": [{"i._id": mongoose.Types.ObjectId(itemId)}], new: true, useFindAndModify: false},
    )
    .then(room => res.json({ room }))
    .catch(err => res.status(500).json(err))
});

// paid true
router.put('/:roomId/paid', auth.required, (req, res, next) => {
  const { params: {roomId}, payload: { id: userId } } = req;

  
});

// // payment
// router.get('/:roomId/payment', auth.required, (req, res, next) => {
//   var LiqPay = require('liqpay-sdk');
//   var liqpay = new LiqPay('sandbox_i62052253639', 'sandbox_dJfnLjRYyF8gBnzXZAxLUy36RyDMDEp2YCchSizU');
//   var html = liqpay.cnb_form({
//   'action'         : 'p2p',
//   'amount'         : '1',
//   'currency'       : 'USD',
//   'description'    : 'description text',
//   'order_id'       : 'order_id_1',
//   'version'        : '3'
//   })


// });




module.exports = router;