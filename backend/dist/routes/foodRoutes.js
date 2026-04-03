"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const foodController_1 = require("../controllers/foodController");
const router = (0, express_1.Router)();
router.get('/categories', foodController_1.getCategories);
router.get('/foods', foodController_1.getFoods);
router.get('/foods/:id', foodController_1.getFoodById);
exports.default = router;
