const express = require("express");
const router = express.Router();
const serverController = require("./server-controller");

router.get("/dashboard", serverController.pageDashboard);
router.get("/dataUser", serverController.dataUser);
router.get("/dataVoucher", serverController.dataVoucher);

module.exports = router;