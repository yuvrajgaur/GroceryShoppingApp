import express from "express"
import {subscribe, contact} from '../Controllers/mailController.js'

const mailRouter=express.Router();

mailRouter.post('/subscribe', subscribe);
mailRouter.post('/contact', contact);

export default mailRouter;