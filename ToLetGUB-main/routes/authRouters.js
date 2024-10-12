const express = require("express");
const Model = require("../models/studentSchema");
const PostShareModel = require("../models/postShareSchema");
const route = express.Router();
const bcrypt = require("bcrypt");
const accessPermission = require("../middlewares/accessPermission");
const availableSeatFetch = require("../middlewares/availableSeatFetch");

//routers for signup
route.get("/signup", (req, res) => {
  res.render("signup",{student:false});
});

route.post("/signup", async (req, res, next) => {
  try {
    //hashing password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    //taking input values from signup.ejs
    const studentInfo = new Model({
      firstName: req.body.fname,
      lastName: req.body.lname,
      studentId: req.body.studentId,
      email: req.body.email,
      password: hashPassword,
      phone: req.body.phone,
      gender: req.body.gender,
      department: req.body.department,
      batch: req.body.batch,
    });

    //generating token
    const token = await studentInfo.generateToken();

    //generating cookie using that token
    res.cookie("studentCookie", token, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true,
    });

    await studentInfo.save();

    //rendering in login.ejs page
    console.log("Sign up succesful.");
    // Redirect to intended page after successful login
    const redirectTo = req.query.redirect || '/homePage';
        res.redirect(redirectTo);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      // Duplicate key error code
      res
        .status(400)
        .json({ error: "You entered duplicate value in the input." });
    } else {
      next(err);
    }
  }
});

//routers for login without error means studentId or password is correct while just want to see the login page
route.get("/login",accessPermission, (req, res) => {
  const redirectTo = req.query.redirect || '/homePage';  // Default to homepage if no redirect provided
  res.render("login", { error: false, redirect: redirectTo, student: req.studentInfo });
});


route.post("/login", availableSeatFetch, async (req, res, next) => {
  try {
    const user = await Model.findOne({ studentId: req.body.studentId });

    if (user) {
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);
      if (isValidPassword) {
        // Generate token and set cookie
        const token = await user.generateToken();
        res.cookie("studentCookie", token, { expires: new Date(Date.now() + 600000), httpOnly: true });

        // Redirect to intended page after successful login
        const redirectTo = req.query.redirect || '/homePage';
        res.redirect(redirectTo);
      } else {
        res.status(400).render("login", { error: true });
      }
    }
  } catch (err) {
    res.status(500).render("login", { error: true });
  }
});


//router for logout
route.post("/logout", accessPermission, async (req, res) => {
  req.studentInfo.tokens = []; //tokens array er sob delete kore dilam

  res.clearCookie("studentCookie");
  await req.studentInfo.save();

  const redirectTo = req.query.redirect || '/homePage';  // Default to homepage if no redirect provided
  res.render("login", { error: false, redirect: redirectTo, student: false });
});

//router for handle an user access------------new
route.get('/check-auth',accessPermission,availableSeatFetch, (req, res) => {
  const redirectTo = req.query.redirect;  // Get the page they want to access

  if(req.unAuthenticateUser){
    res.render("homePage", {
       userAuthenticationError: true,
       student: req.studentInfo,
       availableSeat: req.availableSeatFetch,
      });
  }else{
    if (!req.cookies.studentCookie) {
      // If not authenticated, redirect to login with intended page as query
      res.redirect(`/login?redirect=${redirectTo}`);
    } else {
      // If authenticated, go to the intended page
      res.redirect(redirectTo);
    }
  }
});


//router for home page
route.get("/homePage",accessPermission, availableSeatFetch, (req, res) => {
    console.log("working homepage router");
    try {
      res.status(200).render("homePage",{
        availableSeat : req.availableSeatFetch,
        totalSeatAvailableLength : req.totalSeatAvailableLength,
        student: req.studentInfo,
        userAuthenticationError: false,
      });
    } catch (error) {
      console.log(error);
      res.send("error");
    }
  }
);

//router for profile page
route.get("/profile", accessPermission, async (req, res) => {
  try {
    // .find({}) ----> eita ekta array of object return kore, ejs file a etake if else & loop diye access korte hobe
    // .findOne({}) ----> eita just akta  object return kore, tai etake ejs file a dirrectly access kora jabe
    const postInfo = await PostShareModel.find({
      studentPostedId: req.studentInfo._id,
    });
    console.log(postInfo);

    //ekhane aro kaj baki ase, res.render korte hobe
    res.status(200).render("profile", {
      student: req.studentInfo,
      studentPost: postInfo,
    });
  } catch (error) {
    console.log(error);
    res.send("Please check vs code.");
  }
});

//router for message
route.get("/messages", accessPermission, (req, res) => {
  res.send("welcome to message page. It will be inplement later.");
});

//router for get post share page
route.get("/postShare", accessPermission,availableSeatFetch, (req, res) => {
  console.log("working post share get method.");
  if(req.unAuthenticateUser){
    res.render("homePage", {
       userAuthenticationError: true,
       student: req.studentInfo,
       availableSeat: req.availableSeatFetch,
      });
  }else{
    res.status(200).render("postShare", { student: req.studentInfo });
  }
});

//router for post share post
route.post("/postShare",accessPermission,availableSeatFetch,async (req, res, next) => {
    try {
      //this is for insert the post values into the post share collection
      const postModel = new PostShareModel(req.body);
      const savedPost = await postModel.save();

      console.log("after saving the post in db : ", savedPost);

      //post share collection a student field a j student post korse eita tar id push korlam, track rakhar jonno j ei post ta ke korsilo
      await PostShareModel.updateOne(
        { _id: savedPost._id },
        { $set: { studentPostedId: req.studentInfo._id } }
      );

      res.redirect('/homePage');

    } catch (error) {
      console.log("error occur during post share : ", error);
      next(error);
    }
  }
);




//home page content part (means services routers)
route.get('/totalPostAvailable',accessPermission,availableSeatFetch,(req,res)=>{
  try {
    console.log("totalSeatAvailable router working.");
    res.status(200).render("seeAllAvailableSeat",{
      totalSeatAvailable : req.totalSeatAvailable,
      student: req.studentInfo,
      userAuthenticationError: false,
    })
  } catch (error) {
    console.log("/totalPostAvailable error: ",error);
    next(error);
  }
})

//success rate page
route.get('/successRateSee',accessPermission,availableSeatFetch,(req,res)=>{
  try {
    res.status(200).render("successRatePost",{
      student: req.studentInfo,
      userAuthenticationError: false,
    })
  } catch (error) {
    console.log("success rate router error: ",error);
    next(error);
  }
})



route.post("/findSeatByFiltering",accessPermission, async (req, res, next) => {
  try {
    //taking range limit and location from input in the ejs file
    const rangeLimitStart = req.body.renge1;
    const rangeLimitEnd = req.body.renge2;
    const houseLocation = req.body.location;

      //finding kon kon collection er rent 500tk theke 1500tk er moddhe
      const findSharedPostInRange = await PostShareModel.find({
        rent: { $gte: rangeLimitStart, $lte: rangeLimitEnd },locationDistick: houseLocation
        });
    

  res.status(200).render('seePostByRange',{
    student: req.studentInfo,
    seePost: findSharedPostInRange
  })
  
  } catch (error) {
      console.log(error);
      next(error);
  }
});


module.exports = route;

