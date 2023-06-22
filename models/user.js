/*
 * Author: Sultan Ahmed Sanjar
 * Description : this file will contain the user schema information
 * Date: 18/06/2023
 * Copyright : abibdipto@gmail.com || sultan@2023
 */

// dependecies

// external imports
import mongoose from "mongoose";

// making schema for user
const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 32,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impression: Number,
  },
  { timeStamps: true }
);

// model for user schema
const User = mongoose.model("User", UserSchema);

// finally exporting user model

module.exports = User;
