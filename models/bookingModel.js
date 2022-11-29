const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    bookingId:{type: String, required: true},
    email:{ type: String,required: true,
        unique: true },

    hotelDetails:{
        hotelId:{type: String, required: true},
        hotelCustomId:{type: String, required: true},
        hotelName:{type:String, required:true},
        hotelAddress:{type:String, required:true},
    },

    roomDetails:{
        roomType:{type: String, required: true},
        noOfRooms:{type: Number, required: true},
        nightsNumber:{type: Number, required: true},
        checkIn:{type: String, required: true},
        checkOut:{ type: String, required: true},
        guestCount:  [{ picked: String, amount: Number}],
    },

    userDetails:{
        firstName:{type: String, required: true},
        lastName:{type: String, required: true},
        phoneNumber:{type: String,required: true},
        gender:{type: String, required: true},
        address:{type: String, required: true},
    },

    //Once chekout passed and the date didnt shift we assume a new fee to be calculated as the price and commisiion payable, therefore all hotel owners are encourage to tell customers to check out after check in

    BookingStatus:{
        cancelReservation:{ type: Boolean,default: false},
        confirmCheckIn:{ type: Boolean, 
            default: false},
        confirmCheckOut:{ type: Boolean, 
            default: false}
    },

//Booking company will call to ensure users check in at the right time and commission will start counting immediatly, also will call to ask if they are still checkin and tell them to check out on time
//hotels are adviced to tell customers to check out whenvere they are, or they pay the excess 
//Commission to be calculated immediately on booking confirmation
// commissionPayable will be true once the Booking Status(confirmCheckIn) changed to true,therefore hotels should also reach out to the customers to enable them get the reach of the reservation and not to be empty after check-in ... no story, they will will pay, once we confirmed checkin at our end, so it remains for them to call customers to confirm too


// trying to access this but seems impossible, help to get it solved(so as to remove it from outside tht object and uncomment the one in the paymentstatus object ) ref-line 49
commission:{type: String, required: true},

    paymentStatus:{
        price:{type: Number, required: true},
        // commission:{type: String, required: true},
        commissionPayable:{ type: Number, 
            default: 0}

    },
},{timestamps:true})

module.exports = mongoose.model("Bookings", BookingSchema)
