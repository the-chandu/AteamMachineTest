const express = require('express');

const vegetableController = require("../../controllers/vegetableController");
const {vegSchema} = require("../../validationSchemas/vegSchema");
const {validationMiddleware}  = require("../../middlewares");

const router = express.Router();

router.get("/", vegetableController.getAllVegetables);
router.get("/:id", vegetableController.getVegetable);
router.post("/", [validationMiddleware(vegSchema)], vegetableController.createVegetable);
router.put("/:id", [validationMiddleware(vegSchema)], vegetableController.updateVegetable);
router.delete("/:id", vegetableController.deleteVegetable);

module.exports = router;