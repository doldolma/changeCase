const router = require("express").Router();

router.get("/", (req, res) => {
    console.log("doldolma")
    return res.render("home");
});



module.exports = router;