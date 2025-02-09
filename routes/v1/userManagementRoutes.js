const express = require('express');

const userController = require("../../controllers/userController");
const { validateWorkEmail, validationMiddleware }  = require("../../middlewares");
const {userSchema} = require("../../validationSchemas/userSchema");

const router = express.Router();

router.post('/', [validationMiddleware(userSchema), validateWorkEmail],  userController.createUser);
router.get('/', userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", [validationMiddleware(userSchema), validateWorkEmail], userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;