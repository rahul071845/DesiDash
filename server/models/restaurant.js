import mongoose from "mongoose";
import User from "./user.js";
import MenuItem from "./menuItem.js";

const restaurantSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    menu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: MenuItem
    }]
});

restaurantSchema.index({ name: 1, address: 1 }, { unique: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;