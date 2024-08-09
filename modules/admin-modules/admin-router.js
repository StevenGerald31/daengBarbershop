const express = require("express");
const router = express.Router();
const adminController = require("./admin-controller");

router.get("/coba", adminController.pageCoba);
router.get("/pelanggan", adminController.data_pelanggan);
router.get("/server", adminController.data_server);
router.get("/lokasi", adminController.data_lokasi);
router.post("/tambahServer", adminController.tambah_server);

module.exports = router;
