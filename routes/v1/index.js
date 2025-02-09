const express = require('express');
const router = express.Router();

const authRouter = require('./authRoutes');
const userManagementRoutes = require('./userManagementRoutes');
const vegetableRoutes = require('./vegetableRoutes');
const {authenticate, authorize}  = require("../../middlewares");

router.use('/auth', authRouter);
router.use('/user', [authenticate, authorize(["Admin"])], userManagementRoutes);
router.use('/vegetables', [authenticate], vegetableRoutes);




module.exports = router;