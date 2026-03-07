import express from 'express'
import {isAuth, login, logout, register} from '../Controllers/userController.js'
import authUser from '../Middlewares/authUser.js';
import { updateProfile } from '../Controllers/profileController.js';
import { upload } from '../configs/multer.js';

const userRouter=express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth)
userRouter.get('/logout', logout)
userRouter.put('/edit-profile', authUser, upload.single("image"), updateProfile)


export default userRouter;