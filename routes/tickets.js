const router = require("express").Router();
const {controller} = require("../controllers/tickets")

router.post("/users/new",
/*middlewares*/
 controller.newUser()
 )

router.post("/tickets/new"
/*middlewares*/
 /*controller*/)

router,get("/ticket/:param"
/*middlewares*/
 /*controller*/)

router.post("/tickets/markAsClosed"
/*middlewares*/
 /*controller*/)

router.post("/tickets/delete"
/*middlewares*/
 /*controller*/)
module.exports = router;

// link https://fast-citadel-03015.herokuapp.com/