import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const EditProfile = () => {

const { user, axios, setUser, navigate } = useAppContext()

const [name,setName] = useState(user?.name || "")
const [email,setEmail] = useState(user?.email || "")
const [password,setPassword] = useState("")
const [image,setImage] = useState(null)
const [removeImage,setRemoveImage] = useState(false)

const handleSubmit = async(e)=>{
    e.preventDefault()

    try{

        const formData = new FormData()

        formData.append("name",name)
        formData.append("email",email)

        if(password){
            formData.append("password",password)
        }

        if(image){
            formData.append("image",image)
        }

        if(removeImage){
            formData.append("removeImage",true)
        }

        const {data} = await axios.put("/api/user/edit-profile",formData)

        if(data.success){
            setUser(data.user)
            toast.success("Profile updated")
            navigate("/")
        }else{
            toast.error(data.message)
        }

    }catch(error){
        toast.error(error.message)
    }
}

return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">

        <div className="bg-white p-8 rounded shadow-md w-100">

            <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
                Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Profile Image */}
                <div className="flex flex-col items-center gap-2">

                    <label className="cursor-pointer">

                    <img
                        src={
                            removeImage
                                ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                : image
                                ? URL.createObjectURL(image)
                                : user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        className="w-24 h-24 rounded-full object-cover border"
                    />

                    <input
                        type="file"
                        hidden
                        onChange={(e)=>{
                            setImage(e.target.files[0])
                            setRemoveImage(false)
                        }}
                    />

                    </label>

                    {/* Remove Photo Button */}
                    {(user?.image || image) && (
                    <button
                        type="button"
                        onClick={()=>{
                            setImage(null)
                            setRemoveImage(true)
                        }}
                        className="text-sm text-red-500 hover:underline"
                        >
                        Remove Photo
                    </button>
                    )}

                </div>

                <div className="space-y-3">

                    <label className="font-semibold text-primary">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <label className="font-semibold text-primary">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <label className="font-semibold text-primary">Password</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Optional"
                        className="w-full border px-3 py-2 rounded"
                    />

                </div>

                <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dull cursor-pointer">
                    Update Profile
                </button>

                <button type="button" onClick={()=>navigate('/')} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 cursor-pointer">
                    Cancel
                </button>

            </form>

        </div>

    </div>
)
}

export default EditProfile