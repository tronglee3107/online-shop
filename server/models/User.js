import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email : {type: String, require: true},
    password : {type: String, require: true},
    cartItems: {type: Object, default :{}}
}, {minimize: false})

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;