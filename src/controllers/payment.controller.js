import { Kisaan } from "../models/kisaan.model.js";
import { Product } from "../models/product.model.js";

import stripe from 'stripe';
import { Seller } from "../models/seller.model.js";
import { Order } from "../models/order.model.js";
const Publishable_Key = 'pk_test_51OvdslSHOgBCTCQbl5vdNaMmn5d9Bof749HE2Qf4F1n3NIofGESlZZEc5YQAT7pvwWA3zMpXiOj8rZBPnbaXOhx800k7g0ELra';

const stripeInstance = stripe('sk_test_51OvdslSHOgBCTCQbLwtAmCvS8havkRqnEVIlh5gWRLkjnXZxBbY13EVtHh3XRqeOdIp6cSBhoxxXL5gJORBoSsmq00Zgz9i15S');
const orderForm =  async (req, res) => {
    const product = await Product.findById(req.params.id);
    const kisaan = await Kisaan.findByUsername(req.session.passport.user)
    const seller = await Seller.findOne({ products: product._id })
  
    const order = await Order.create({
        product: product._id,
        user: kisaan._id,
        productname: product.title,
        address: req.body.address,
        username: kisaan.username,
        price: product.price,
        contact: kisaan.contact,
        productImage: product.productImage,
        status: "ordered"
    })
    console.log("orderrrrrrrrrrrrr--",order)
    await order.save(),
    kisaan.orders.push(order._id);
    await kisaan.save()
    seller.orders.push(order._id)
    await seller.save()
    res.redirect(`/kisaan/payment/${product._id}`)
  }
const stripePaymentProcessingPost =  async (req, res) => {
    try {
        const user = await Kisaan.findOne({ username: req.session.passport.user });
        console.log(user)
        const productId = req.params.id;
        const product = await Product.findOne({_id:productId});
        if (!product) {
            return res.status(404).send("Product not found");
        }
  
        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount: product.price * 100,
            currency: 'INR',
            payment_method_types: ['card'],
            customer: user.stripeCustomerId,
            setup_future_usage: 'off_session',
            confirm: true,
            payment_method_data: {
                type: 'card',
                card: {
                    token: req.body.stripeToken
                }
            },
            description: product.description,
            shipping: {
                address: {
                    line1: "address",
                    city: 'Indore',
                    postal_code: '452331',
                    state: 'Madhya Pradesh',
                    country: 'IN'
                },
                name: "customer - name",
                phone: "9919400789"
            },
            receipt_email: "ayusg@gmail.com",
        });
  
        res.redirect(`/kisaan/success/${productId}`);
    } catch (error) {
        res.status(500).send("Payment Error: " + error.message);
    }
  }
const success = async (req,res)=>{
    const productId = req.params.productId;
    const product = await Seller.findOne({_id:productId})
    const kisaan= await Kisaan.findOne({username:req.user.username})
    res.render('success',{kisaan,product});
  }
const stripePaymentProcessingGet = async (req, res) => {
    try {
        const productid = req.params.id;
        const product = await Product.findOne({ _id: productid });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render('payment', { key: Publishable_Key, product });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
  }
export {stripePaymentProcessingGet,stripePaymentProcessingPost,success,orderForm}
  