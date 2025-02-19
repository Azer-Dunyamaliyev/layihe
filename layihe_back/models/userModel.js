import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, default: "" },
    surname: { type: String, default: "" },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    countryCode: { type: String },
    address: { type: String, default: "" },
    zip: { type: String, default: "" },
    country: { type: String, default: "" },
    town: { type: String, default: "" },
    // cards: [
    //   {
    //     cardNumber: { type: String, default: "" },
    //     holder: { type: String, default: "" },
    //     month: { type: String, default: "" },
    //     year: { type: String, default: "" },
    //     cvv: { type: String, default: "" },
    //   },
    // ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
