import express from "express"
const router = express.Router()
import { Seller } from "../models/seller.model.js"
import { isLoggedIn, sellerLogin, sellerRegistration } from "../controllers/auth.controller.js"
import  passport  from "passport"
import { Product } from "../models/product.model.js"
import { upload } from "../middlewares/multer.middleware.js"
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import { addProduct } from "../controllers/seller.controller.js"

router.get("/home",(req,res)=>{
    res.send("Sellers - HOME")
})
router.get("/signup",(req,res)=>{
    res.render("seller.auth.ejs")
})
router.get("/login",(req,res)=>{
    res.render("sellerLogin")
})
router.post('/addproduct', isLoggedIn, upload.single('productImage'),addProduct)


router.get('/myproducts',isLoggedIn,async(req,res)=>{
    const username = req.user.username
    console.log(username)
    const seller = await Seller.findOne({username}).populate('products');
    res.send(seller)
})
router.get('/addproduct',isLoggedIn,async(req,res)=>{
    console.log(req.user.username)
    console.log(req.session.passport.user)
    res.render('seller_addproduct')
})
router.post('/login',sellerLogin)
router.post("/signup",sellerRegistration);




export default router