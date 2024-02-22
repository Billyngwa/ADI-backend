const express = require("express");
const router = express.Router();
const controls = require("../controllers/user");
const authChecker = require("../middlewares/authMiddleWare");
const authentication = require("../controllers/authentication");
const post = require("../controllers/post");
const news = require("../controllers/news");


router.get("/",controls.getAllUsers); //Route to get all users from system ADI

router.get("/:id",controls.getUserById);  //Route to get a user by his id 

router.delete("/",controls.deleteAllUsers);// Route to delete all user from ADI

router.delete("/:id",controls.deleteUserById); // Route to delete a particular user

router.post("/signup",authentication.register); // Route to register users in ADI

router.post("/forgot-password",authentication.forgotPassword); // Route for forgot password

router.post("/forgot-password/reset",authentication.resetToken); // Route to reset password

router.post("/signin", authChecker.checkUser, authentication.signIn); //Route to sign in user

/*
 ******************************************************* End of user Routes ******************************
*/

router.post("/poster",post.createPost);// Route to create posts

router.get("/:id",post.getPostById); //Route to get particular post

router.patch("/:id",post.updatePost); //Route to update a post by id

router.delete("/:id",post.deletePost); //Route to delete a particular post by id

/*
 ******************************************************* End of post Routes ******************************
*/

router.post("/poster",news.createNews);// Route to create news

router.get("/:id",news.getNewsById); //Route to get particular news

router.patch("/:id",news.updateNews); //Route to update a news by id

router.delete("/:id",news.deleteNews); //Route to delete a particular news by id

module.exports = router;