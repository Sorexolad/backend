import mongoose from "mongoose";


const vendorSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company name required"]
    },
    address: {
        type: String,
    },
    contact: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }
}, { timestamps: true})

const vendorModel = mongoose.model('vendorModel', vendorSchema)

export default vendorModel