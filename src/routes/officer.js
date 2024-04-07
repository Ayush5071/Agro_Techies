import express from "express"
const router = express.Router()
import { Officer } from "../models/officer.model.js"
import { Blog } from "../models/blog.model.js";
import { isLoggedIn, officerLogin, officerRegistration } from "../controllers/auth.controller.js";
import { Kisaan } from "../models/kisaan.model.js"
import { Seller } from "../models/seller.model.js";
import  passport  from "passport";
import { cropPrice } from '../models/officerCrop.model.js';
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import { Mongoose } from "mongoose";

router.post("/blog",isLoggedIn,async (req,res)=>{
    const username = req.user.username;
    console.log(username)
    const officer = await Officer.findByUsername(username);
    console.log("data of officer",officer);
    const data = await Blog.create({
        heading:req.body.heading,
        content:req.body.content,
        officer:officer.fullName,
        designation:officer.designation,
        elligibility:req.body.elligibility,
        schemeLink:req.body.schemeLink
    })
    await data.save()
    officer.blogs.push(data._id)
    res.json(data);
})
router.get("/home",isLoggedIn,(req,res)=>{
    res.send("OFFICERS - HOME")
})
router.get("/blog",isLoggedIn,async function(req,res){
    const username = req.user
    console.log("olele ",username)
    res.render('blog')
})
router.get("/signup",(req,res)=>{
    res.render("officer.auth.ejs")
})
router.get("/login",(req,res)=>{
    res.render("officerLogin")
})
router.get('/marketPlace',isLoggedIn,async (req,res)=>{
    const crops = await cropPrice.find();
    res.render('officer_market',{crops})
})
router.post('/marketPlace', upload.array('image[]', 5), async (req, res) => {
    try {
        console.log(req.body);
        const cropData = [];
        console.log(req.body.cropName)
        console.log(req.body.price)
        
        for (let i = 0; i < req.body.cropName.length; i++) {
            const name = req.body.cropName[i];
            const price = req.body.price[i];
            const imagePath = req.files[i].path;
            
            // Upload image to Cloudinary and get URL
            const cloudinaryResponse = await uploadOnCloudinary(imagePath);
            console.log("thisis response of cloud---",cloudinaryResponse)
            const url = cloudinaryResponse.url;
            console.log("instant url after before set of datas.. -->",url)
            console.log(name, price, imagePath);
            
            const crop = await cropPrice.create({
                cropName: name,
                price: price,
                image: url
            });
            console.log("finalCropdata", crop);
            cropData.push(crop);
        }

        res.status(200).send('Crop prices inserted successfully.');
    } catch (error) {
        console.error('Error inserting crop prices:', error);
        res.status(500).send('Error inserting crop prices.');
    }
});
router.put('/marketPlace/:cropId', async (req, res) => {
    try {
        const { cropId } = req.params;
        const { price } = req.body;

        const updatedCrop = await cropPrice.findByIdAndUpdate(cropId, { price }, { new: true });

        if (!updatedCrop) {
            return res.status(404).send('Crop not found.');
        }
        res.status(200).send('Price updated successfully.');
    } catch (error) {
        console.error('Error updating crop price:', error);
        res.status(500).send('Error updating crop price.');
    }
});

router.delete('/marketPlace/:cropId', async (req, res) => {
    try {
        const { cropId } = req.params;
        console.log(cropId)
        const deletedCrop = await cropPrice.findByIdAndDelete(cropId);
        if (!deletedCrop) {
            return res.status(404).send('Crop not found');
        }

        res.status(200).send('Crop deleted successfully');
    } catch (error) {
        console.error('Error deleting crop:', error);
        res.status(500).send('Error deleting crop');
    }
});






router.get('/addCrops',(req,res)=>{
    res.render('officer_addCrops')
})

router.post("/signup",officerRegistration);
router.post('/login', officerLogin)

export default router;