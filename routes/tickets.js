const express = require("express")
const router = express.Router()
const controller = require("../controllers/tickets")
const middlewares = require("../middlewares/tickets")
const {body,query} = require("express-validator")

router.post("/users/new",
[body("username").notEmpty().withMessage("username is required"),
body("role").notEmpty().withMessage("role is required")],
middlewares.checkInput,
middlewares.CheckUsername,
middlewares.checkRole,
 controller.newUser
 )

// router.post("/tickets/new"
// /*middlewares*/
//  /*controller*/)

// router,get("/ticket/:param"
// /*middlewares*/
//  /*controller*/)

// router.post("/tickets/markAsClosed"
// /*middlewares*/
//  /*controller*/)

// router.post("/tickets/delete"
// /*middlewares*/
//  /*controller*/)


module.exports = router;

// link https://fast-citadel-03015.herokuapp.com/