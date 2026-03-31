const mongoose = require("mongoose");

const magicItemsSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ["Spell", "Potion"], required: true },
    element: String,
    power: { type: Number, min: 1, max: 100 },
    rarity: String,
    description: String,
    status: String
});

module.exports = mongoose.model("MagicItems", magicItemsSchema);