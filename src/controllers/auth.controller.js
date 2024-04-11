import express from "express"
import { Officer } from "../models/officer.model.js"
import { Kisaan } from "../models/kisaan.model.js"
import { Seller } from "../models/seller.model.js";
import passport from "passport";


const farmerRegistration = async(req,res)=>{
    try {
      const {email,username,state,city} = req.body
      console.log(username)
      const data =  new Kisaan({
        username:username,
        email:email,
        state:state,
        city:city,
      })
      console.log(data)
      Kisaan.register(data,req.body.password)
      .then(function(registereduser){
        passport.authenticate("farmer-local")(req,res,function(){
          res.redirect('/kisaan/home')
        })
      })
    } catch (error) {
      res.send("error")
    }
  }
  const officerRegistration = async (req, res) => {
    try {
      const { email, username, designation, fullName,contact } = req.body;
      console.log(username);
      const data = new Officer({
        username: username,
        email: email,
        designation: designation,
        fullName: fullName,
        contact:contact
      });
      console.log(data); // Log data before calling register function
        Officer.register(data, req.body.password)
        .then(function (registereduser) {
          passport.authenticate("officer-local")(req, res, function () {
            res.redirect("/officer/home");
          });
        })
        .catch(function (error) {
          console.error("Error registering officer:", error);
          res.status(500).send("Error registering officer");
        });
    } catch (error) {
      console.error("Error in officer registration:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  const sellerRegistration = async (req, res) => {
    try {
      const { email, username, fullName } = req.body;
      console.log(username);
      const data = new Seller({
        username: username,
        email: email,
        fullName: fullName,
      });
      console.log(data); 
        Seller.register(data, req.body.password)
        .then(function (registereduser) {
          passport.authenticate("seller-local")(req, res, function () {
            res.redirect("/seller/home");
          });
        })
        .catch(function (error) {
          console.error("Error registering officer:", error);
          res.status(500).send("Error registering officer");
        });
    } catch (error) {
      console.error("Error in officer registration:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  const isLoggedIn = function(req, res, next) {
    const isAuthenticated = req.isAuthenticated();
    const isKisaan = req.user instanceof Kisaan;
    const isOfficer = req.user instanceof Officer;
    const isSeller = req.user instanceof Seller;

  
    if (isAuthenticated && isKisaan ) {
        return next();
    }
    if (isAuthenticated && isOfficer ) {

        return next();
    }
    if (isAuthenticated && isSeller ) {
        return next();
    }
  
    console.log("Not authenticated or user type unrecognized");
    res.redirect('/');
};

  
  const kisaanLogin = async function(req, res, next) {
    passport.authenticate("farmer-local", {
      successRedirect: "/kisaan/profile",
      failureRedirect: "/"
    })(req, res, next);
  };
  
  const officerLogin = async function(req, res, next) {
    passport.authenticate("officer-local", {
      successRedirect: "/officer/profile",
      failureRedirect: "/"
    })(req, res, next);
  };
  
  const sellerLogin = async function(req, res, next) {
    passport.authenticate("seller-local", {
      successRedirect: "/seller/profile",
      failureRedirect: "/"
    })(req, res, next);
  };
  
  export {farmerRegistration,officerRegistration,sellerRegistration,isLoggedIn,kisaanLogin,officerLogin,sellerLogin}