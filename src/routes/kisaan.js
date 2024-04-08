import express from "express"
const router = express.Router()
import { Kisaan } from "../models/kisaan.model.js";
import passport from 'passport';
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import { farmerRegistration, isLoggedIn, kisaanLogin } from "../controllers/auth.controller.js";
import { Blog } from "../models/blog.model.js";
import { weatherApi } from "../controllers/kisaan.controller.js";
import { Product } from "../models/product.model.js";
import { Crop } from "../models/crop.model.js";
import { cropPrice } from "../models/officerCrop.model.js";
import stripe from 'stripe';
const Publishable_Key = 'pk_test_51OvdslSHOgBCTCQbl5vdNaMmn5d9Bof749HE2Qf4F1n3NIofGESlZZEc5YQAT7pvwWA3zMpXiOj8rZBPnbaXOhx800k7g0ELra';

const stripeInstance = stripe('sk_test_51OvdslSHOgBCTCQbLwtAmCvS8havkRqnEVIlh5gWRLkjnXZxBbY13EVtHh3XRqeOdIp6cSBhoxxXL5gJORBoSsmq00Zgz9i15S');

router.get('/payment/:id', async (req, res) => {
  try {
      const productid = req.params.id;
      const product = await productModel.findOne({ _id: productid });
      if (!product) {
          return res.status(404).send("Product not found");
      }
      res.render('payment', { key: Publishable_Key, product });
  } catch (error) {
      res.status(500).send("Internal Server Error");
  }
});

router.post('/payment/:id', isLoggedIn, async (req, res) => {
  try {
      const user = await userModel.findOne({ username: req.session.passport.user });
      const productId = req.params.id;
      const product = await productModel.findById(productId);
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
          description: product.title,
          shipping: {
              address: {
                  line1: req.body.address,
                  city: 'Indore',
                  postal_code: '452331',
                  state: 'Madhya Pradesh',
                  country: 'IN'
              },
              name: req.body.name,
              phone: req.body.phone
          },
          receipt_email: req.body.email,
      });

      res.redirect("/success");
  } catch (error) {
      res.status(500).send("Payment Error: " + error.message);
  }
});

router.post("/place-order/:id", isLoggedIn, async (req, res) => {
  const product = await productModel.findById(req.params.id);
  const user = await userModel.findByUsername(req.session.passport.user)
  const seller = await sellerModel.findOne({ products: product._id })

  const order = await orderModel.create({
      product: product._id,
      user: user._id,
      productname: product.title,
      address: req.body.address,
      username: user.username,
      price: product.price,
      mode: req.body.mode,
      contact: req.body.contact,
      productImage: product.productImage,
      status: "ordered"
  })
  await order.save(),
  user.orders.push(order._id);
  await user.save()
  seller.sales.push(order._id)
  await seller.save()
  res.redirect(`/payment/${product._id}`)
})


router.get('/kisaan',(req,res)=>{
  res.render('navbar')
})

router.get('/', function(req, res, next) {
  res.send('index');
});
router.get('/home', isLoggedIn,function(req, res, next) {
  res.render('blog');
});
router.get('/auth', function(req, res, next) {
  res.render('kisaan.auth.ejs');
});
router.get('/login', function(req, res, next) {
  res.render('kisaanLogin');
});

router.post("/signup",farmerRegistration)

router.post('/login', kisaanLogin)

router.post("/image",isLoggedIn,upload.single("image"),async (req,res)=>{
  const username = req.session.passport.user
  console.log(username)//
  const data = await Kisaan.findOne({username:username})
  console.log(data) //
  const imagePath = req.file.path
  const url = await uploadOnCloudinary(imagePath).url
  console.log(url)


  
})
router.get('/inventory',isLoggedIn,async (req,res)=>{
  const username = req.session.passport.user;
  const crops = await Kisaan.findOne({username}).populate('crops')
  res.send(crops)
})

router.get('/market',isLoggedIn,async (req,res)=>{
  const products =  await Product.find();
  res.render('kisaan_market',{products});
})
router.get('/product/:id',isLoggedIn,async (req,res)=>{
  const product = await Product.findOne({_id:req.params.id})
  res.render('farmer_product_detail',{product});
})
router.post('/buy/:id',isLoggedIn,async (req,res)=>{
  const id = req.params.id
  const products =  await Product.findOne({_id:id});
  res.send(products);
})



router.get('/marketPlace',isLoggedIn,async (req,res)=>{
  const crops = await cropPrice.find();
  res.render('kisaan_marketPlace',{crops})

})
router.post('/marketPlace/:cropName',isLoggedIn, async (req, res) => {
  try {
      const { cropName } = req.params;
      const {quantity} = req.body;
      const kisaanId = req.user._id;
      const cropModel = await Crop.findOne({kisaan:kisaanId});

      const kisaan = await Kisaan.findById(kisaanId).populate('crops');
      console.log(kisaan)
      if (!kisaan) {
          return res.status(404).send('Kisaan not found');
      }
      const crop = await cropPrice.findOne({ cropName: cropName });
      if (!crop) {
          return res.status(404).send('Crop not found');
      }
      console.log("checkkkkkk---",kisaan.crops[cropName])

      if (kisaan.crops[cropName] < quantity) {
          return res.status(400).send('Insufficient quantity of crop');
      }
      

      const totalPrice = crop.price * quantity;
      kisaan.balance += totalPrice;
      kisaan.crops[cropName] -= quantity;
      cropModel[cropName] -= quantity;
      await kisaan.save();
      await cropModel.save();
      console.log("new one --- ",kisaan.crops[cropName]);

      res.status(200).send('Crop sold successfully');
  } catch (error) {
      console.error('Error selling crop:', error);
      res.status(500).send('Internal Server Error');
  }
});
router.post('/addCrops', isLoggedIn, async (req, res) => {
  try {
      const username = req.user.username
      const farmer = await Kisaan.findOne({username});
      const { rice, wheat, maize } = req.body;
      console.log("dekhhhhhhhhhhhhhhhhhhhh------",rice,wheat,maize)
      
      // Create a new crop document
      const newCrop = new Crop({
          kisaan:farmer._id,
          rice: rice || 0,
          wheat: wheat || 0,
          maize: maize || 0
      });
      console.log(newCrop)
      await Crop.create(newCrop);
      farmer.crops = newCrop._id;
      await farmer.save();
      await newCrop.save();

      res.redirect('/kisaan/inventory'); 
  } catch (error) {
      console.error('Error adding crops:', error);
      res.status(500).send('Error adding crops');
  }
});


router.get('/addCrops',isLoggedIn,(req,res)=>{
  res.render('kisaan_addCrops')
})


  

router.get("/blog",isLoggedIn,async (req,res)=>{
  console.log(req.user.username)
  console.log(req.session.passport.user)
  const blogs = await Blog.find()
  res.send(blogs)
})
router.get("/market",isLoggedIn,async (req,res)=>{
  const product = await Product.find();
  res.send(product)
})
router.get('/weather', weatherApi)
router.get('/dashboard',isLoggedIn,(req,res)=>{
  res.render('weather')
})


export default router
