import mongoose from "mongoose"
import express from "express"
import { updateCart } from "../Controllers/cartController.js";
import authUser from "../Middlewares/authUser.js";

const cartRouter=express.Router();

cartRouter.post('/update', authUser, updateCart)

export default cartRouter;

