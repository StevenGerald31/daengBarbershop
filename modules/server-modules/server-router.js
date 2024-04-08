const express = require("express");
const router = express.Router();
const serverController = require("./server-controller");

router.get("/dashboard", serverController.pageDashboard);
router.get("/dataUser", serverController.dataUser);
router.get("/dataVoucher", serverController.dataVoucher);
router.get("/dataProduk", serverController.dataProduk);

module.exports = router;
