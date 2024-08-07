const express = require("express");
const router = express.Router();
const homepageController = require("./homepage-controller");

router.get("/landingpage", homepageController.Landingpage);
router.get("/loginpage", homepageController.Loginpage);
router.post("/login", homepageController.loginUser);
router.get("/request/:lokasi", homepageController.view_data_request);
router.get("/reserved/:lokasi", homepageController.view_data_reserved);
router.get("/allData/:lokasi", homepageController.view_all_data_booking);
router.get("/allDataProduk", homepageController.view_all_data_produk);
router.post("/newJenisProduk", homepageController.tambah_jenis_produk);
router.put("/updateStok", homepageController.update_stok);
router.get("/pelanggan/:lokasi", homepageController.data_pelanggan);
router.put("/booking/confirm/:bookingId", homepageController.confirmBooking);
router.put("/booking/finish/:bookingId", homepageController.finishBooking);
router.put("/booking/cancel/:bookingId", homepageController.canceledBooking);

module.exports = router;
