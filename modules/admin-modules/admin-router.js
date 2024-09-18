const express = require("express");
const router = express.Router();
const adminController = require("./admin-controller");

router.get("/coba", adminController.pageCoba);
router.get("/pelanggan", adminController.data_pelanggan);
router.get("/server", adminController.data_server);
router.get("/lokasi", adminController.data_lokasi);
router.post("/tambahLokasi", adminController.tambah_lokasi);
router.put("/editLokasi/:id_lokasi", adminController.edit_lokasi);
router.delete("/deleteLokasi", adminController.delete_lokasi);
router.get("/konten", adminController.data_konten);
router.post("/tambahKonten", adminController.tambah_konten);
router.post("/tambahServer", adminController.tambah_server);
router.post("/resetPassword", adminController.resetPassword);
router.delete("/deleteContent/:id", adminController.delete_konten);
router.delete("/deleteExpiredContent", adminController.deleteExpiredContent);

module.exports = router;
