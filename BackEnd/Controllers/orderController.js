    import Order from "../Models/Order.js";
    import Product from "../Models/Product.js";
    import stripe from 'stripe'
    import User from '../Models/User.js'
    import mongoose from "mongoose";

    //place order by COD: /api/order/cod
    export const placeOrderCOD = async(req, res)=>{
        try{
            const {items, address}=req.body;
            const userId=req.user.id;

            if(!address || items.length===0){
                return res.status(400).json({
                    success: false,
                    message:"Cart is empty"
                })
            }

            //calculate amount using items
            let amount = 0;

            for (const item of items) {
                const product = await Product.findById(item.product);
                amount += product.offerPrice * item.quantity;
            }

            //add tax charge (2%)
            amount+=amount * 0.02;

            const order=await Order.create({
                userId,
                items,
                amount,
                address,
                paymentType:'COD',
            });

            return res.status(201).json({
                success:true,
                message:"Order placed successfully",
                order
            })
        }catch(error){
            return res.json({
                success:false,
                message:error.message
            })
        }
    }

    //place order by Stripe : /api/order/stripe
    export const placeOrderStripe = async(req, res)=>{
        try{
            const {items, address}=req.body;
            const userId=req.user.id;
            const {origin}=req.headers;

            if(!address || items.length===0){
                return res.json({
                    success: false,
                    message:"Invalid data"
                })
            }

            let productData=[];

            //calculate amount using items
            let amount=await items.reduce(async (acc, item)=>{
                const product=await Product.findById(item.product);

                productData.push({
                    name:product.name,
                    price: product.offerPrice,
                    quantity:item.quantity,
                });

                return (await acc) + product.offerPrice * item.quantity;
            }, 0)

            //add tax charge (2%)
            amount+=amount * 0.02;

            const order=await Order.create({
                userId,
                items,
                amount,
                address,
                paymentType:'Online',
            });

            //stripe gateway initialize
            const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);

            //create line items for stripe
            const line_items=productData.map((item)=>{
                return{
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:item.name,
                        },
                        unit_amount: item.price * 1.02 * 100
                    },
                    quantity:item.quantity,
                }
            })

            //create session
            const session=await stripeInstance.checkout.sessions.create({
                line_items,
                mode:"payment",
                success_url: `${origin}/loader?next=my-orders`,
                cancel_url: `${origin}/cart`,
                metadata:{
                    orderId:order._id.toString(),
                    userId,
                }
            })

            return res.json({
                success:true,
                url: session.url,
            })

        }catch(error){
            return res.json({
                success:false,
                message:error.message
            })
        }
    }

    //stripe webhooks to verify payments action: /stripe
    export const stripeWebhooks=async(request, response)=>{
        //stripe gateway initialize
        
        const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);

        const sig=request.headers["stripe-signature"];
        
        let event;

        try {
            event=stripeInstance.webhooks.constructEvent(
                request.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (error) {
                return response.status(400).send(`Webhook Error: ${error.message}`);
        }

        //handle the event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            const { orderId, userId } = session.metadata;

            // mark order paid
            await Order.findByIdAndUpdate(orderId, {
                isPaid: true,
                paymentType: "Online"
            });

            // clear cart
            await User.findByIdAndUpdate(userId, { cartItems: {} });
        }
        response.json({
            received:true
        })
    }

    //Get order by user ID: /api/order/user
    export const getUserOrders= async (req,res)=>{
        try{
            const userId=req.user.id;
            
            const orders=await Order.find({
                userId,
                // $or: [{paymentType: 'COD'}, {isPaid: true}]
            })
            .populate("items.product address")
            .sort({createdAt: -1});
            
            res.json({
                success : 
                true, orders
            });

        }catch(error){
            res.json({
                success:false, 
                message: error.message
            });
        }
    }

    //get all orders(for seller/admin): /api/order/seller
    export const getAllOrders= async (req,res)=>{
        try{   
            const orders=await Order.find({})
            .populate("items.product address")
            .sort({createdAt: -1});

            res.json({
                success : true, 
                orders
            });

        }catch(error){
            console.error("SELLER ORDERS ERROR:", error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }