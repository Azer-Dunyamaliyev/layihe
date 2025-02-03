import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{type:String,require: true,unique: true},
    email:{type:String, require: true,unique: true},
    password:{type:String},
},{timestamps: true})

const userModel = mongoose.model('User',userSchema)

export default userModel