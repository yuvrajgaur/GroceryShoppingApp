import Address from "../Models/Address.js";

//Add address: /api/address/add
export const addAddress=async(req, res)=>{
    try{
        const{address}=req.body
        const userId=req.user.id;

        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Address is required"
            });
        }

        await Address.create({...address, userId})
        res.json({
            success: true,
            message:"Address added successfully"
        })
    }catch(error){
        console.log(error.message);
        res.json({
            success:false,
            error:error.message
        })
    }
}

export const getAddress= async(req, res)=>{
    try{
        const userId=req.user.id;
        const addresses=await Address.find({userId})
        res.json({
            success: true, 
            addresses
        })
    }catch(error){
        console.log(error.message);
        res.json({
            success:false,
            message:error.message
        })
    }
}