const express = require('express');
const seePost = express.Router();
const accessPermission = require('../middlewares/accessPermission');
const PostShareModel = require('../models/postShareSchema');

//home page services individual page
//section
seePost.get("/range1",accessPermission, async (req, res, next) => {
    try {
        //finding kon kon collection er rent 500tk theke 1500tk er moddhe
        const findSharedPostInRange = await PostShareModel.find({
          rent: { $gte: 1, $lt: 1500 }
          });
      
          console.log("Range post fetched successful.");

    res.status(200).render('seePostByRange',{
      student: req.studentInfo,
      seePost: findSharedPostInRange
    })
    
    } catch (error) {
        console.log(error);
        next(error);
    }
});
//section
seePost.get("/range2",accessPermission, async (req, res, next) => {
    try {
        //finding kon kon collection er rent 500tk theke 1500tk er moddhe
        const findSharedPostInRange = await PostShareModel.find({
          rent: { $gte: 1, $lt: 1500 }
          });
      
          console.log("Range post fetched successful.");

    res.status(200).render('seePostByRange',{
      student: req.studentInfo,
      seePost: findSharedPostInRange
    })
    
    } catch (error) {
        console.log(error);
        next(error);
    }
});
//section
seePost.get("/range3",accessPermission, async (req, res, next) => {
    try {
        //finding kon kon collection er rent 500tk theke 1500tk er moddhe
        const findSharedPostInRange = await PostShareModel.find({
          rent: { $gte: 1, $lt: 1500 }
          });
      
          console.log("Range post fetched successful.");

    res.status(200).render('seePostByRange',{
      student: req.studentInfo,
      seePost: findSharedPostInRange
    })
    
    } catch (error) {
        console.log(error);
        next(error);
    }
});
//section
seePost.get("/range4",accessPermission, async (req, res, next) => {
    try {
        //finding kon kon collection er rent 500tk theke 1500tk er moddhe
        const findSharedPostInRange = await PostShareModel.find({
          rent: { $gte: 1, $lt: 1500 }
          });
      
          console.log("Range post fetched successful.");

    res.status(200).render('seePostByRange',{
      student: req.studentInfo,
      seePost: findSharedPostInRange
    })
    
    } catch (error) {
        console.log(error);
        next(error);
    }
});
//section
seePost.get("/range5",accessPermission, async (req, res, next) => {
    try {
        //finding kon kon collection er rent 500tk theke 1500tk er moddhe
        const findSharedPostInRange = await PostShareModel.find({
          rent: { $gte: 1, $lt: 1500 }
          });
      
          console.log("Range post fetched successful.");

    res.status(200).render('seePostByRange',{
      student: req.studentInfo,
      seePost: findSharedPostInRange
    })
    
    } catch (error) {
        console.log(error);
        next(error);
    }
});
//section
seePost.get("/range6",accessPermission, async (req, res, next) => {
    try {
        //finding kon kon collection er rent 500tk theke 1500tk er moddhe
        const findSharedPostInRange = await PostShareModel.find({
          rent: { $gte: 1, $lt: 1500 }
          });
      
          console.log("Range post fetched successful.");

    res.status(200).render('seePostByRange',{
      student: req.studentInfo,
      seePost: findSharedPostInRange
    })
    
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// same vabe aro 5 ta seePost er jonno router create korte hobe 



module.exports = seePost;