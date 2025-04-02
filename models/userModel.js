import mongoose from "mongoose";




const userSchema = mongoose.Schema({
name: {
    type: String,
    required: [ true, 'Name is required'],
},
email: {
    type: String,
    required: [ true, 'Email is required'],
    unique: [ true, 'Email has been used before']
},

password: {
    type: String,
    required: true
},
phonenumber: {
    type: Number,
    required: true
},
gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    required: true
},
vendor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendorModel'
}]




}, { timestamps: true})

const userModel = mongoose.model('userModel', userSchema)

export default userModel


//model relationships

// 1. 1-1 (one-to-one)

// 2. 1-n (one-to-many)

// 3. m-n (many-to-many)