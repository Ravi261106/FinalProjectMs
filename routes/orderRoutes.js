const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const stripe = require("stripe")("sk_test_51HvfktAxBrXJs2UIXoIjoNLHMnrdYLJKuzrNf6RcgJeLlbNtvbmoIDM0Z2lLVt4CWzZbwYF7rqSW0QAzQejmsqcn00M4npIG4u");
const Order = require("../model/orderModel");


router.post('/placeorder', async (req, res) => {
    const {token, price, currentUser, cartItems}= req.body
    try{
        const customer = await stripe.customers.create({
            email:token.email,
            source:token.id
        })
        const payment = await stripe.charges.create({
            amount:price*100,
            currency:'inr',
            customer:customer.id, 
            receipt_email:token.email
        },{
            idempotencyKey: uuidv4()

        })
        if(payment){
            const newOrder = new Order({
                name:currentUser.FirstName,
                email:currentUser.email,
                userid:currentUser._id,
                orderItems:cartItems,
                orderAmount:price,
                shippingAddress:{
                    street:token.card.address_line1,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    picode:token.card.address_zip,
                },
                transectionId:payment.source.id


            });
            newOrder.save();
            res.send('Payment Success')
        }else{
            res.send('Payment Faild')
        }
    }catch(error){
        res.status(400).json({
            message: "Something Went Wrong",
            error:error.stack
        })

    }
})


module.exports = router;