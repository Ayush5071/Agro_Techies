import express from "express"
const router = express.Router()
import { Blog } from "../models/blog.model.js";
import { isLoggedIn, officerLogin, officerRegistration } from "../controllers/auth.controller.js";
import { Officer } from "../models/officer.model.js"
import { Seller } from "../models/seller.model.js";
import  passport  from "passport";
import { cropPrice } from '../models/officerCrop.model.js';
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary} from "../middlewares/cloudinary.middleware.js";
import { Mongoose } from "mongoose";

router.post("/blog", isLoggedIn, upload.single('image'), async (req, res) => {
    try {
        const username = req.user.username;
        console.log(username);
        const officer = await Officer.findByUsername(username);
        console.log("data of officer", officer);
        const filePath = req.file.path;
        const cloudinaryResponse = await uploadOnCloudinary(filePath);
        if (!cloudinaryResponse || !cloudinaryResponse.url) {
            throw new Error("Failed to upload image to Cloudinary");
        }
        const url = cloudinaryResponse.url;
        console.log(url);
        const data = await Blog.create({
            heading: req.body.heading,
            content: req.body.content,
            officer: officer.fullName,
            designation: officer.designation,
            elligibility: req.body.elligibility,
            schemeLink: req.body.schemeLink,
            image: url
        });
        await data.save();
        officer.blogs.push(data._id);
        await officer.save();
        res.json(data);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/blog/:id', isLoggedIn, async (req, res) => {
    try {
        const blogId = req.params.id;
        await Blog.findByIdAndDelete(blogId);
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get("/home",isLoggedIn,(req,res)=>{
    res.send("OFFICERS - HOME")
})
router.post("/officer-p-image-upload",isLoggedIn,upload.single("profileImage"), async (req, res) => {
    try {
        const username = req.user.username;
        const officer = await Officer.findOne({ username: username });
        console.log(username,"bhugevcj ghjv yufg g ftv gh yuvgkjh")
        if (!officer) {
            return res.status(404).json({ error: "Officer not found" });
        }
  
        const path = req.file.path;
        console.log(path)
        const cloudinaryResponse = await uploadOnCloudinary(path);
  
        if (!cloudinaryResponse || !cloudinaryResponse.url) {
            return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
        }
  
        const url = cloudinaryResponse.url;
        console.log(url)
        officer.profileImage = url;
        await officer.save();
        return res.redirect("/officer/profile");
    } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.get("/profile",isLoggedIn,async (req,res)=>{
    const officer = await Officer.findOne({username:req.user.username});
    const totalkisaan = await Officer.countDocuments();
    res.render("officerProfile",{officer,totalkisaan})
})
router.get("/blogt",isLoggedIn,async function(req,res){
    const blogs = Blog.find()
    const officer = await Officer.findOne({username : req.session.passport.user})
    console.log(officer)
    res.render('blogToolkit',{blogs})
})
router.get("/blog",isLoggedIn,async function(req,res){
    const blogs = Blog.find();
    res.render('blog',{blogs})
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

            const cloudinaryResponse = await uploadOnCloudinary(imagePath); // Upload image to Cloudinary
            if (!cloudinaryResponse) {
                throw new Error('Cloudinary upload failed'); // Handle if Cloudinary upload fails
            }

            console.log("thisis response of cloud---", cloudinaryResponse)
            const url = cloudinaryResponse.url;
            console.log("instant url after before set of datas.. -->", url)
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
router.get('/addblog',(req,res)=>{
    res.render('officer_addblog')
})

router.post("/signup",officerRegistration);
router.post('/login', officerLogin)

export default router;