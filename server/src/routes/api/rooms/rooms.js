const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Rooms = mongoose.model('Rooms');

// create new room document, add room to user, add admin to splitters
router.post('/', auth.required, (req, res, next) => {
  const { body: room, payload: { id }} = req;

  if(!room.name) {
    return res.status(422).json({
      error: 'Room name is required'
    });
  }

  room.admin = id;
  room.splitters = [{splitter: id}];

  return Rooms.create(room)
    .then(newRoom => {
      Users.findByIdAndUpdate(
        id,
        { $push: { rooms: newRoom._id } },
        { new: true, useFindAndModify: false }
      )
      .catch(err =>  res.status(500).json(err));

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
  const { roomId } = req.params;
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
            ).then(response => res.status(200).json(response)).catch(e => res.status(500).json(e));
          })
          .catch(err => res.satus(500).json(err));
      }
      return Users.findByIdAndUpdate(
          userId,
          { $pull: { rooms: roomId} },
          { new: true, useFindAndModify: false }
        ).then(response => res.status(200).json(response)).catch(e => res.status(500).json(e));
    });
  
});

// get chosen room
router.get('/:roomId', auth.required, (req, res, next) => {
  const { roomId } = req.params;
  const { payload: { id: userId }} = req;
  return Rooms.findById(roomId)
    .populate('splitters.splitter')
    .populate({
      path: "items",
      populate: {
        path: "payees"
      }
    })
    .then(room => {
        const roomObj = room.toObject();

        const extendedRoom = room.admin === userId ? {...roomObj, isAdmin: true} : {...roomObj};
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
        user.rooms.push(roomId);
        return user.save()
          .then(() => {
            Rooms.findById(roomId)
              .then(room => {
                if(!(room.splitters.filter( splitter => splitter.splitter._id.toString() === userId).length > 0)){
                  room.splitters.push({splitter: userId});
                  return room.save()
                    .then(response => res.status(200).json(room));
                }
                return res.status(200).json(room);
              });       
          })
          .catch(err =>  res.status(500).json(err));
        }
        return res.status(200).json(user);
      })
    .catch(err => res.status(500).json(err));
});

// add new item
router.post('/:roomId/items', auth.required, (req, res, next) => {
  const { body: newItem, params: { roomId }, payload: { id: userId }} = req;
  
  const itemWRoundedPrice = {
    ...newItem,
    price: +newItem.price.toFixed(2)
  };

  return Rooms.findById(roomId)
  .then(room =>{
    if (room.admin === userId){
      room.items.push(itemWRoundedPrice);
      return room.save()
        .then(room => res.json({ room }))
        .catch(err => res.status(500).json(err));
    }

    let err = new Error('Permission to add item denied');
    return res.status(403).json(err);
  });
});

// delete item and decrece to pay of splitters, who was paying for this item
router.delete('/:roomId/items/:itemId', auth.required, (req, res, next) => {
  const { params: {roomId, itemId}, payload: { id: userId }} = req;
  return Rooms.findById(roomId)
    .then(room =>{
      if (room.admin === userId){
        const selectedItemIndex = room.items.findIndex(item => item._id.toString() === itemId);
        const selectedItem = room.items[selectedItemIndex];

        room.splitters.map(splitter => {
          if(selectedItem.payees.includes(splitter.splitter._id)){
            splitter.toPay -= selectedItem.price/selectedItem.divideAmoung;
            return splitter;
          }
          return splitter;
        });

        room.items = room.items.filter(item => item._id.toString() !== itemId);

        return room.save()
          .then(room => res.json({ room }))
          .catch(err => console.log(err))
          .catch(err => res.status(500).json(err));
      }
      return res.status(403).json('Permission to delete item denied');
    })
    .catch(err => console.log(err))
    .catch(err => res.status(500).json(err));
});

// add payee for an item and increse toPay value
router.post('/:roomId/items/:itemId/payee', auth.required, (req, res, next) => {
  const { params: {roomId, itemId}, payload: { id: userId } } = req;
  return Rooms.findById(roomId)
    .then(room => {
      const selectedItemIndex = room.items.findIndex(item => item._id.toString() === itemId);
      const selectedItem = room.items[selectedItemIndex];
      if(selectedItem.length !== selectedItem.divideAmoung && !selectedItem.payees.includes(userId)){
        // add payee to an item
        selectedItem.payees.push(userId);
        // increse toPay value for payee
        room.splitters.map(splitter => {
          if(splitter.splitter._id.toString() === userId){
            splitter.toPay += selectedItem.price/selectedItem.divideAmoung;
            return splitter;
          }
          return splitter;
        });
        return room.save()
          .then(room => res.json({ room }))
          .catch(err => res.status(500).json(err));
      }
      return res.status(403).json('Item has been taken already');
    })
    .catch(err => res.status(500).json(err));

});

// remove payee from an item add decrece toPay value
router.delete('/:roomId/items/:itemId/payee', auth.required, (req, res, next) => {
  const { params: {roomId, itemId}, payload: { id: userId } } = req;

  return Rooms.findById(roomId)
    .then(room => {
      const selectedItemIndex = room.items.findIndex(item => item._id.toString() === itemId);
      const selectedItem = room.items[selectedItemIndex];
      selectedItem.payees = selectedItem.payees.filter(payee => payee.toString() !== userId);

      room.splitters.map(splitter => {
        if(splitter.splitter._id.toString() === userId){
          splitter.toPay -= selectedItem.price/selectedItem.divideAmoung;
          return splitter;
        }
        return splitter;
      });
      return room.save()
        .then(room => res.json({ room }))
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
    
});

// if splitter.isSplitterPaid true => splitter paid true and check if items was fully paid if was item.isPaid true
// else splitter.isSplitterPaid false => splitter paid false and check if items was fully paid if wasn't item.isPaid false
router.put('/:roomId/payment', auth.required, (req, res, next) => {
  const { params: {roomId}, payload: { id: userId }, body: {isSplitterPaid} } = req;
  return Rooms.findById(roomId)
    .then(room => {
      room.splitters.map(splitter => {
        if(splitter.splitter._id.toString() === userId){
          if(isSplitterPaid){
            splitter.splitterPaid = true;
            return splitter;
          }else{
            splitter.splitterPaid = false;
            return splitter;
          }
          return splitter;
        }
        // splitter.splitterPaid = false;
        return splitter;
      });

      // chek items was fully paid
      const paidSplitters = room.splitters.filter(splitter => splitter.splitterPaid);
      room.items.map(item => {
        const paidPayeesNum = item.payees.filter(payee =>{
          return paidSplitters.filter(paidSplitter => {
            return paidSplitter.splitter._id.toString() === payee.toString();
          }).length > 0;
        }).length;
        if(isSplitterPaid && paidPayeesNum === item.divideAmoung){
          item.isPaid = true;
          return item;
        }
        item.isPaid = false;
        return item;
      });
      return room.save()
        .then(room => res.json({ room }))
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});

// router.put('/:roomId/unpayment', auth.required, (req, res, next) => {
//   const { params: {roomId}, payload: { id: userId } } = req;

//   return Rooms.findById(roomId)
//     .then(room => {
//       room.splitters.map(splitter => {
//         if(splitter.splitter._id.toString() === userId){
//           splitter.splitterPaid = false;
//           return splitter;
//         }
//         return splitter;
//       });

//       // chek what items was fully paid
//       const paidSplitters = room.splitters.filter(splitter => splitter.splitterPaid);
//       room.items.map(item => {
//         const paidPayeesNum = item.payees.filter(payee =>{
//           return paidSplitters.filter(paidSplitter => {
//             return paidSplitter.splitter._id.toString() === payee.toString();
//           }).length > 0;
//         }).length;
//         if(paidPayeesNum !== item.divideAmoung){
//           item.isPaid = false;
//           return item;
//         }
//         return item;
//       });
//       return room.save()
//         .then(room => res.json({ room }))
//         .catch(err => res.status(500).json(err));
//     })
//     .catch(err => res.status(500).json(err));
// });

module.exports = router;