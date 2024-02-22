const express = require("express");
const router = express.Router();
const adminRouter = require("../modules/admin-modules/admin-router");
const serverRouter = require("../modules/server-modules/server-router");
const homepageRouter = require("../modules/homepage-modules/homepage-router");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/admin", adminRouter);
router.use("/server", serverRouter);
router.use("/web", homepageRouter);

module.exports = router;
