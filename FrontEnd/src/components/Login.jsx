import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.js";
import { assets } from '../assets/assets.js';

const Login = () => {

    const {setShowUserLogin, setUser, axios, navigate, setCartItems}=useAppContext();

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

     const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const { data } = await axios.post('/api/user/google-login',
                {
                    name: user.displayName,
                    email: user.email,
                }
            );

            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems || {});
                setShowUserLogin(false);
                navigate('/');
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log("Google login error:", error),
            toast.error(error.message);
        }
    }

    const onSubmitHandler=async(event)=>{
        try {
            event.preventDefault();

            const {data}=await axios.post(`/api/user/${state}`, {name, email, password})

            if(data.success){
                navigate('/')
                setUser(data.user)
                setCartItems(data.user.cartItems || {}) //changes
                setShowUserLogin(false)
            }else{
                toast.error(data.message)
            }

            setShowUserLogin(false);
        } catch (error) {
            toast.error(error.message)
        }
        
    }

    return (
        // if we click anywhere than login form, it will go back
        <div onClick={()=>setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'>
            
            <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-stretch p-8 py-12 w-80 sm:w-88 text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter your name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                    </div>
                )}  
                <div className="w-full ">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
                </div>

                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>

                 <div className='flex items-center '>
                    <div className='flex-1 h-px bg-gray-300'></div>
                    <p className='px-3 text-sm text-gray-500'>or</p>
                    <div className='flex-1 h-px bg-gray-300'></div>
                </div>

                <button type='button' onClick={handleGoogleLogin} className='w-full border border-gray-300 py-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-100 transition'>
                            <img src={assets.google_logo} alt='' className='w-6 h-6' />
                            <span className='text-gray-700 font-medium'>Continue with Google</span>
                        </button> 

                {state === "register" ? (
                    <p>
                        Already have an account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                    </p>
                ) : (
                    <p>
                        Don't have an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                    </p>
                )}

                

            </form>
        </div>
    );
}

export default Login
