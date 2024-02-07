const express = require("express");
const router = express.Router();
const adminController = require("./admin-controller");

router.get("/dashboard", adminController.pageDashboard);
router.get("/dataProduk", adminController.dataProduk);
router.get("/dataUser", adminController.dataUser);
router.get("/dataServer", adminController.dataServer);
router.get("/dataVoucher", adminController.dataVoucher);
router.get("/coba", adminController.pageCoba);


module.exports = router;