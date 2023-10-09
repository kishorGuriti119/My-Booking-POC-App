var RoomsModel = require("../models/room");
var HotelModel = require("../models/hotel");
const { ClientSession } = require("mongodb");
var nodemailer = require("nodemailer");

const CreateNewRoom = async (req, res, next) => {
  const roomdetails = req.body;
  const room = new RoomsModel(roomdetails);

  const hotelId = req.params.hotelid; // this room will be added to the hotel which have id (hotelid)

  try {
    const savedRoom = await room.save();
    console.log(savedRoom);

    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id }, // this push method will be add the id to the rooms array
      });
    } catch (err) {
      next(err);
    }
    res.status(200).send(savedRoom);
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  let roomId = req.params.id;
  let hotelId = req.params.hotelid;
  let body = req.body;

  try {
    let hotel = await HotelModel.findById(hotelId);
    if (!hotel) {
      return res.send("Hotel not found");
    }
    let room = await Promise.all(
      hotel.rooms.map((each) => {
        return RoomsModel.findById(each);
      })
    );

    // console.log(room, "thisw is room");

    if (!room) {
      return res.send("Room Not found");
    }
    let updatedRoom = await RoomsModel.findByIdAndUpdate(roomId, body);

    await hotel.save();

    return res.send(hotel);
  } catch (err) {
    return res.send(err);
  }
};

const AllRoomsInHotel = async (req, res, next) => {
  let hotlId = req.params.hotelId;

  try {
    let hotel = await HotelModel.findById(hotlId);
    // console.log(hotel, "the");

    let allRooms = await Promise.all(
      hotel.rooms.map((each) => {
        return RoomsModel.findById(each);
      })
    );
    return res.status(200).send(allRooms);
  } catch (err) {
    next(err);
  }
};

// const singleRoom = async (req, res, next) => {
//   let id = req.params.id;

//   try {
//     let singleroom = await RoomsModel.findById(id);
//     return res.status(200).send(singleroom);
//   } catch (err) {
//     next(err);
//   }
// };

const singleRoom = async function (req, res, next) {
  let roomId = req.params.roomid;
  let hotelId = req.params.hotelid;

  try {
    let hotel = await HotelModel.findById(hotelId);

    if (!hotel) {
      return res.send("Hotel not found");
    }

    let room = await Promise.all(
      hotel.rooms.map((each) => {
        return RoomsModel.findById(each);
      })
    );

    return res.send(room);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const DeleteRoom = async (req, res, next) => {
  let id = req.params.id;
  let hotelId = req.params.hotelid;

  try {
    await RoomsModel.findByIdAndDelete(id);

    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: id },
      });
    } catch (err) {
      next(err);
    }

    return res.status(200).send();
  } catch (err) {
    next(err);
  }
};

const dummyRoute = async (req, res, next) => {
  // let hotelId = req.params.hotelid;

  try {
    let roomdetails = new RoomsModel(req.body);
    await roomdetails.save();
    console.log(roomdetails, "this is room");

    let allHotels = await HotelModel.find();

    let updateHotel = await Promise.all(
      allHotels.map((each) => {
        return HotelModel.findByIdAndUpdate(each._id, {
          $push: { rooms: roomdetails._id },
        });
      })
    );

    return res.send(updateHotel);
  } catch (err) {
    // next(err);
    console.log(err);
    return res.send("this is cach");
  }
};

const dummyDelete = async (req, res, next) => {
  let roomId = req.params.id;

  let allHotels = await HotelModel.find();

  try {
    let deleted = await Promise.all(
      allHotels.map((each) => {
        return HotelModel.findByIdAndUpdate(each._id, {
          $pull: { rooms: roomId },
        });
      })
    );
    return res.send(deleted);
  } catch (err) {
    return res.send("err");
  }
};

// const bookRoom = async (req, res, next) => {
//   let body = req.body;
//   let hotelId = req.params.hotelid;
//   let roomId = req.query.roomid;
//   let selectedDates = req.body.selectedDates;
//   try {
//     let hotel = await HotelModel.findById(hotelId);

//     if (hotel.length === 0) {
//       return res.send({ result: "hotel not found" });
//     } else {
//       let categoryRooms = await Promise.all(
//         hotel.rooms.map(async (catRoomId) => {
//           return await RoomsModel.findById(catRoomId);
//         })
//       );

//       if (categoryRooms.length === 0) {
//         return res.send({ result: "Room was not Found" });
//       } else {
//         let selectedIndividualRoom = await Promise.all(
//           categoryRooms.map((eachcatroom) => {
//             return eachcatroom.roomNumbers.filter((eachIndRoom) => {
//               return eachIndRoom._id.toString() === roomId;
//             });
//           })
//         );

//         selectedIndividualRoom = selectedIndividualRoom.filter((each) => {
//           return each.length !== 0;
//         });
//         console.log(selectedIndividualRoom[0][0], "244"); // correct

//         let updatedRoom = await RoomsModel.updateOne(
//           { "roomNumbers._id": roomId },
//           {
//             $addToSet: {
//               "roomNumbers.$.unavailableDates": { $each: selectedDates },
//             },
//           }
//           // {
//           //   $set: { "roomNumbers.$.unavailableDates": [] }, //set is to update  push is to push thr data // addToset is push date only it doesnot exist in the array
//           // }
//         );
//         await hotel.save();
//         return res.send(updatedRoom);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };

const bookRoom = async (req, res, next) => {
  let body = req.body;
  let hotelId = req.params.hotelid;
  let roomId = req.query.roomid;
  let selectedDates = req.body.selectedDates;
  if (roomId === null) {
    next();
  }
  try {
    let hotel = await HotelModel.findById(hotelId);

    if (hotel.length === 0) {
      return res.send({ result: "hotel not found" });
    } else {
      let categoryRooms = await Promise.all(
        hotel.rooms.map(async (catRoomId) => {
          return await RoomsModel.findById(catRoomId);
        })
      );

      if (categoryRooms.length === 0) {
        return res.send({ result: "Room was not Found" });
      } else {
        let selectedIndividualRoom = await Promise.all(
          categoryRooms.map((eachcatroom) => {
            return eachcatroom.roomNumbers.filter((eachIndRoom) => {
              return eachIndRoom._id.toString() === roomId;
            });
          })
        );

        selectedIndividualRoom = selectedIndividualRoom.filter((each) => {
          return each.length !== 0;
        });
        console.log(selectedIndividualRoom[0][0], "244"); // correct

        let updatedRoomdata = await RoomsModel.updateOne(
          { "roomNumbers._id": roomId },
          {
            $addToSet: {
              "roomNumbers.$.unavailableDates": { $each: selectedDates },
            },
          }
          // {
          //   $set: { "roomNumbers.$.unavailableDates": [] }, //set is to update  push is to push thr data // addToset is push date only it doesnot exist in the array
          // }
        );

        selectedIndividualRoom[0][0].unavailableDates = selectedDates;
        console.log(selectedIndividualRoom, "278");
        await hotel.save();
        return res.send(selectedIndividualRoom);
      }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const sendEmail = async (req, res, next) => {
  console.log(req.body, "from email");
  let BookedHotelid = req.body.BookedHotelid;
  let userBookingdetails = req.body.userBookingdetails;
  let hotelDetails = req.body.hotelDetails;
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kishorguriti119@gmail.com",
        pass: "tgrjdzrdscvivzdf",
      },
    });

    // var mailOptions = {
    //   from: "kishorguriti119@gmail.com",
    //   to: "kishorguriti119@gmail.com",
    //   subject: "Booking Succussfull",
    //   text: "emailfunctionality checking",
    //   html: `<h1>${hotelDetails.name}<h1>
    //         <p>dates from :${userBookingdetails.unavailableDates[0]} to: ${
    //     userBookingdetails.unavailableDates[
    //       userBookingdetails.unavailableDates.length - 1
    //     ]
    //   }
    //     </p>
    //          <p>room number :${userBookingdetails.number}<p/>
    //     <button onclick="myFunction()">alert<button>
    //     <script>
    //     function myFunction() {
    //       // Your JavaScript functionality here
    //       alert('Button clicked!');
    //     }
    //   </script>
    //     `,
    // };
    var mailOptions = {
      from: "kishorguriti119@gmail.com",
      to: "kishorguriti119@gmail.com",
      subject: "Booking Successful",
      text: "Email functionality checking",
      html: `
        <h1>${hotelDetails.name}</h1> 
        <p>Dates from: ${userBookingdetails.unavailableDates[0]} to: ${
        userBookingdetails.unavailableDates[
          userBookingdetails.unavailableDates.length - 1
        ]
      }</p>
        <p>Room number: ${userBookingdetails.number}</p>
        <a href="http://192.168.0.199:3000/Booking.com/hotels?searchresults.en-gb.html?&city=vizag&type=all&adult=1&child=0&rooms=1&from=Sun%20Oct%2001%202023%2015:37:39%20GMT+0530%20(India%20Standard%20Time)&to=Mon%20Oct%2002%202023%2015:37:39%20GMT+0530%20(India%20Standard%20Time)" onclick="myFunction()">Click me</a>
        <script>
          function myFunction() {
            // Your JavaScript functionality here
            alert('Link clicked!');
          }
        </script>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports = {
  CreateNewRoom,
  updateRoom,
  singleRoom,
  DeleteRoom,
  AllRoomsInHotel,
  dummyRoute,
  dummyDelete,
  bookRoom,
  sendEmail,
};
