import express from "express"
const router = express.Router()
import { Seller } from "../models/seller.model.js"
import { isLoggedIn, sellerLogin, sellerRegistration } from "../controllers/auth.controller.js"
import  passport  from "passport"
import { Product } from "../models/product.model.js"
import { upload } from "../middlewares/multer.middleware.js"
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import { addProduct } from "../controllers/seller.controller.js"

router.get("/home",isLoggedIn,(req,res)=>{
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
router.get('/profile',isLoggedIn,async (req,res)=>{
    const seller = await Seller.findOne({username:req.user.username})
    console.log(seller)
    res.render('sellerProfile',{seller})
})
router.post("/sellerImage",isLoggedIn,upload.single("profileImage"), async (req, res) => {
    try {
        const username = req.user.username;
        const seller = await Seller.findOne({ username: username });
        
        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }
  
        const path = req.file.path;
        const cloudinaryResponse = await uploadOnCloudinary(path);
  
        if (!cloudinaryResponse || !cloudinaryResponse.url) {
            return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
        }
  
        const url = cloudinaryResponse.url;
        seller.profileImage = url;
        await seller.save();
  
        return res.redirect("/seller/profile");
    } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.post("/test",isLoggedIn,upload.single("profileImage"),async(req,res)=>{
    const seller =  await Seller.findOne({username:req.user.username})
    const path = req.file.path
    const cloudinary = await uploadOnCloudinary(path)
    const url = cloudinary.url;
    seller.profileImage = url;
    seller.save();
    res.redirect('/seller/test')
})
router.get("/test",isLoggedIn,(req,res)=>{
    res.render('test')
})


export default router