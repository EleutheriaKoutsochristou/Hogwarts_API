const MagicItem = require("../models/MagicItem");

// GET ALL + FILTERS
exports.getAllItems = async (req, res) => {
    try {
        let queryObj = {};
        if (req.query.type) {
            queryObj.type = req.query.type;
        }
        if (req.query.rarity) {
            queryObj.rarity = req.query.rarity;
        }
        if (req.query.status) {
            queryObj.status = req.query.status;
        }
        if (req.query.minPower || req.query.maxPower) {
            queryObj.power = {};
            if (req.query.minPower) {
                queryObj.power.$gte = Number(req.query.minPower);
            }
            if (req.query.maxPower) {
                queryObj.power.$lte = Number(req.query.maxPower);
            }
        }
        const items = await MagicItem.find(queryObj);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST
exports.createItem = async (req, res) => {
    try {
        const item = await MagicItem.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE
exports.deleteItem = async (req, res) => {
    try {
        await MagicItem.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE
exports.updateItem = async (req, res) => {
    try {
        const item = await MagicItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};