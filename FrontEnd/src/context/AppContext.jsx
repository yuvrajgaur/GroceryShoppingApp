//AppContext.jsx is a global state management file using React Context API
//It provides global state and functions to components across the app without prop drilling
//It manages user auth status, role (buyer/seller), navigation, and UI states like login modal visibility
//Components can access this context to get/set user info, navigate, and control UI elements

import React, {createContext, useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";  //importing axios for HTTP requests, backend communication

axios.defaults.withCredentials=true;  //this line ensures that cookies are included in cross-origin requests, allowing the app to maintain user sessions and authentication state when communicating with the backend API.
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;  //this line sets the default base URL for all axios requests to the value specified in the environment variable VITE_BACKEND_URL, which should point to the backend server's address. This allows you to easily manage and change the backend URL without modifying individual request code throughout the app.

export const AppContext=createContext();

export const AppContextProvider=({children})=>{  //children is just a name for the prop that will contain the components wrapped by this provider, it allows us to render those components inside the provider so they can access the context values. When we use <AppContextProvider> in our app, any components placed inside it will be passed as children and can access the context we define here. we can name it anything, but 'children' is a common convention in React for this purpose.

    const currency=import.meta.env.VITE_CURRENCY;

    const navigate=useNavigate();
    const [user, setUser]=useState(null)
    const [isSeller, setIsSeller]=useState(false)
    const [showUserLogin, setShowUserLogin]=useState(false)
    const [products, setProducts]=useState([])
    const [cartItems, setCartItems]=useState({})
    const [searchQuery, setSearchQuery]=useState("")

    //fetch seller stauts
    const fetchSeller=async()=>{
        try{
            const {data}=await axios.get('/api/seller/is-auth');
            if(data.success){
                setIsSeller(true)
            }else{
                setIsSeller(false)
            }
        }catch(error){
            setIsSeller(false)
        }
    }

    //fetch user auth status, user data and cart items
    const fetchUser=async()=>{
        try{
            const {data}=await axios.get('/api/user/is-auth')
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems || {})
            }else{
                setUser(null)
                setCartItems({});
            }
        }catch(error){
                (null)
            setCartItems({});
        }
    }

    //Fetch all products
    const fetchProducts= async()=>{
        try {       
            const {data}=await axios.get('/api/product/list');
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //add product to cart
    const addToCart=(itemId)=>{
        let cartData=structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId]+=1;
        }else{
            cartData[itemId]=1;
        }
        setCartItems(cartData);
        toast.success("Added to cart");
    }

    //update cart items quantity
    const updateCartItem=(itemId, quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId]=quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    //remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            delete cartData[itemId];   // remove item completely
        }

        setCartItems(cartData);
        toast.success("Item removed from cart");
    }
    
    //get cart item count
    const getCartCount=()=>{
        let totalCount=0;
        for(const item in cartItems){
            totalCount+=cartItems[item]
        }
        return totalCount;
    }

    //get total cart amount
    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id==items);

            if (!itemInfo) continue;

            if(cartItems[items]>0){
                totalAmount+=itemInfo.offerPrice*cartItems[items]
            }
        }
        return Math.floor(totalAmount*100)/100;
    }

     
    useEffect(()=>{
        fetchSeller();
        fetchProducts();    
        fetchUser();
    },[])

    //update database cart items
    useEffect(() => {
        if (!user || !user._id) return;

        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems });

                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        updateCart();
    }, [user, cartItems]);

    const value={navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, setCartItems, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartCount, getCartAmount, axios, fetchProducts}
    // value is the object that contains all the state variables and functions that we want to provide to the components consuming this context. we are making these states and functions accessible to any component that uses this context. This allows for centralized state management and easier data flow across the app without prop drilling.

    return <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
}


export const useAppContext=()=>{
    return useContext(AppContext)
}