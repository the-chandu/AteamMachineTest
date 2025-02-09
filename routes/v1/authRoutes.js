const express = require('express');

const authController = require("../../controllers/authController");
const { validateWorkEmail, validationMiddleware }  = require("../../middlewares");
const {loginSchema} = require("../../validationSchemas/userSchema");

const router = express.Router();

router.post('/login', [validationMiddleware(loginSchema), validateWorkEmail], authController.login);

module.exports = router;