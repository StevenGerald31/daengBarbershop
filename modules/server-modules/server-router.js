const express = require("express");
const router = express.Router();
const serverController = require("./server-controller");
const middleware = require("../middleware/middleware");

router.get(
  "/dashboard",
  middleware.isAuthenticated,
  middleware.authorize(["2"]),
  serverController.pageDashboard
);
router.get("/dataUser", serverController.dataUser);
router.get("/dataVoucher", serverController.dataVoucher);
router.get("/dataProduk", serverController.dataProduk);

module.exports = router;
