import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
},{ timestamps: true });

const wishListModel = mongoose.model('wishlist',wishlistSchema)

export default wishListModel
