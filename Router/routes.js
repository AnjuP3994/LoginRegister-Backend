//1. import express
const express = require('express')

//2. create router object of express to define paths
const router = new express.Router()

//4. import userController 
const userController = require('../Controllers/userController')

//7. import jwtMiddleware
const jwtMiddleware = require('../Middleware/jwtMiddleware')



// // using router object to define routes(paths)

//5. userRegister API call
router.post('/userRegister',userController.userRegister)

//6. userLogin API call
router.post('/userLogin',userController.userLogin)



//3. exports router
module.exports = router;