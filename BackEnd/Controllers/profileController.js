import User from "../Models/User.js";
import {v2 as cloudinary} from 'cloudinary'

export const updateProfile = async (req,res)=>{
    try{

        const {name,email,password} = req.body
        const image = req.file

        const user = await User.findById(req.user.id)

        if(name) user.name=name
        if(email) user.email=email

        if(password){
            user.password=password
        }

        if(image){
            const result = await cloudinary.uploader.upload(image.path,{
                folder:"gogrocery_users"
            })

            user.image = result.secure_url
        }

        await user.save()

        res.json({
            success:true,
            user
        })

    }catch(error){
        res.json({
            success:false,
            message:error.message
        })
    }
}