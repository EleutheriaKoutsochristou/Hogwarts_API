const express = require("express");
const router = express.Router();
const MagicItem = require("../models/MagicItem");

const {
    getAllItems,
    createItem,
    deleteItem,
    updateItem
} = require("../controllers/MagicController");

// routes
router.get("/", getAllItems);
router.post("/", createItem);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.exports = router;