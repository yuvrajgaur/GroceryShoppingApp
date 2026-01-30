import User from "../Models/User.js";


//Update user cartData :/api/cart/update
export const updateCart=async (req, res)=>{
    try{
        const {cartItems}=req.body
        const userId=req.user.id;
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({
            success:true,
            message: "Cart Updated"
        })
    }catch(error){
        console.log(error.message)
        res.json({
            success:false,
            message: error.message
        })
    }
}