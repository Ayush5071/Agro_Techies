import express from "express"
const router = express.Router()
import { Kisaan } from "../models/kisaan.model.js";
import passport from 'passport';
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import { farmerRegistration, isLoggedIn, kisaanLogin } from "../controllers/auth.controller.js";
import { Blog } from "../models/blog.model.js";
import { Inventory, addCrops, addCropsForm, allProducts, login, sellingCrop, showmarketPlace, signup, weatherApi } from "../controllers/kisaan.controller.js";
import { Product } from "../models/product.model.js";
import { Crop } from "../models/crop.model.js";
import { cropPrice } from "../models/officerCrop.model.js";

import { orderForm, stripePaymentProcessingGet, stripePaymentProcessingPost, success } from "../controllers/payment.controller.js";


router.get('/payment/:id',stripePaymentProcessingGet);
router.get("/success/:productId",isLoggedIn,success)
router.post('/payment/:id', isLoggedIn,stripePaymentProcessingPost)

router.post("/place-order/:id",isLoggedIn,orderForm)

router.get('/signup',signup)
router.get('/login',login)

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
router.get('/home', isLoggedIn,function(req, res, next) {
  res.render('blog');
});
router.get('/inventory',isLoggedIn,Inventory)

router.get('/market',isLoggedIn,allProducts)
router.get('/product/:id',isLoggedIn,async (req,res)=>{
  const product = await Product.findOne({_id:req.params.id})
  res.render('farmer_product_detail',{product});
})
router.post('/buy/:id',isLoggedIn,async (req,res)=>{
  const id = req.params.id
  const products =  await Product.findOne({_id:id});
  res.send(products);
})



router.get('/marketPlace',isLoggedIn,showmarketPlace)
router.post('/marketPlace/:cropName',isLoggedIn,sellingCrop)
router.post('/addCrops', isLoggedIn, addCrops)

router.get('/addCrops',isLoggedIn,addCropsForm)


  

router.get("/blog",isLoggedIn,async (req,res)=>{
  const blogs = await Blog.find()
  res.render('kisaanBlog',{blogs})
})

router.get('/blogs/:id',isLoggedIn,async(req,res)=>{
  const blog = await Blog.findOne({_id:req.params.id})
  res.render('kisaan_blog_detail',{blog})
})
router.get("/market",isLoggedIn,async (req,res)=>{
  const product = await Product.find();
  res.send(product)
})
router.get('/weather', weatherApi)

router.get('/dashboard',isLoggedIn,async(req,res)=>{
  const username = req.user.username
  const kisaan = await Kisaan.findOne({username});
  // const balanceHistory = await kisaan.select('balanceHistory').exec();
  res.render('kisaan_dashboard',{kisaan})
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//for dashboard .....
router.get('/balance-chart', async (req, res) => {
  try {
      // Simulated data for testing
      const balanceHistory = [
          1244, 124, 1204, 1444, 1244, 124, 1204, 1444, 1244, 124,
          1204, 1444, 1244, 124, 1204, 1444, 1244, 124, 1204, 1444,
          1244, 124, 1204, 1444
      ];

      // Create a canvas and context
      const canvas = createCanvas(800, 400);
      const ctx = canvas.getContext('2d');

      // Create a new chart instance
      const chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: Array.from({ length: balanceHistory.length }, (_, i) => i + 1),
              datasets: [{
                  label: 'Balance (INR)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  data: balanceHistory
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });

      // Convert the chart to a base64-encoded PNG image
      const chartImageUrl = canvas.toDataURL();

      // Send the chart image as the response
      res.send(`<img src="${chartImageUrl}" alt="Balance Chart">`);
  } catch (error) {
      console.error('Error generating balance chart:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Route to fetch crop quantity data
router.get('/crop-quantity', async (req, res) => {
  try {
      const kisaanId = req.user._id;
      const kisaan = await Kisaan.findById(kisaanId).select('crops').exec();
      res.json(kisaan.crops);
  } catch (error) {
      console.error('Error fetching crop quantity data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch crop distribution data
router.get('/crop-distribution', async (req, res) => {
  try {
      // Add logic to fetch crop distribution data from the database
      res.json({ message: 'Crop distribution data' });
  } catch (error) {
      console.error('Error fetching crop distribution data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch crop price data
router.get('/crop-price', async (req, res) => {
  try {
      // Add logic to fetch crop price data from the database
      res.json({ message: 'Crop price data' });
  } catch (error) {
      console.error('Error fetching crop price data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router
