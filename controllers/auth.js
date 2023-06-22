/*
 * Author: Sultan Ahmed Sanjar
 * Description : this is resgister unit of this server app . it will authenticate and register the users .
 * Date: 18/06/2023
 * Copyright : abibdipto@gmail.com || sultan@2023
 */

// dependencies

// external imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

// internal imports

// Register user

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // securing the password and making pass salt

    const salt = await bcrypt.genSalt(password);
    const hashPassword = await bcrypt.hash(password, salt);
    // crating new use object
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impression: Math.floor(Math.random() * 10000),
    });
    // saving the user data
    const savedUser = await newUser.save();
    // sending response to the user
    res.status(201).json({
      message: `Successfully saved user data  & data is ${savedUser}`,
    });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

module.exports = register;
