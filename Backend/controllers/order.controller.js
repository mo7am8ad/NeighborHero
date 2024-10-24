import createError from "../utils/createError.js";
import Order from '../SchemaModules/order.model.js';
import Service from '../SchemaModules/service.model.js'
import Stripe from "stripe";


export const intent = async (req,res,next)=>{
    const stripe = new Stripe(
        process.env.STRIPE
    );

    const service = await Service.findById(req.params.id);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: service.price * 100,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
        enabled: true,
        },
    });

    const newOrder = new Order({
        serviceId: service._id,
        img: service.cover,
        title: service.title,
        buyerId: req.userId,
        sellerId:service.userId,
        price:service.price,
        payment_intent: paymentIntent.id,
    });
    await newOrder.save();

    res.status(200).send({
        clientSecret: paymentIntent.client_secret,
    })
};


/* export const createOrder = async (req,res,next)=>{ this was for test before adding stripe gateway
    try {
        
        const service = await Service.findById(req.params.serviceId);

        const newOrder = new Order({
            serviceId: service._id,
            img: service.cover,
            title: service.title,
            buyerId: req.userId,
            sellerId:service.userId,
            price:service.price,
            payment_intent:"temporary",
        });     
        await newOrder.save();
        res.status(200).send("successful");
    } catch (err) {
        next(err);
    }
};*/
export const getOrders = async (req,res,next)=>{
    try {
        const orders = await Order.find({
            ...(req.isSeller ? {sellerId: req.userId} : {buyerId: req.userId}),
            isCompleted: true,
        });
        res.status(200).send(orders);
    } catch (err) {
        next(err)
    }
};

export const confirm = async (req,res,next)=>{
    try {
        const orders = await Order.findOneAndUpdate({
            payment_intent: req.body.payment_intent,
        },
            {
                $set:{
                    isCompleted:true,
                }
    
            }
    );

        res.status(200).send("Order has been confirmed");
    } catch (err) {
        next(err)
    }
};

