const express = require("express");
const router = express.Router();

router.post('/juiceData', async (req, res) => {
    try {
        res.send([global.juice_items, global.juice_category])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

module.exports = router;