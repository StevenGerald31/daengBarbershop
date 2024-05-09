const getBaseUrl = require("../../utils/getBaseUrl");
const { sequelize, Sequelize } = require("../../db");

const pageDashboard = async (req, res) => {
  try {

    const lokasi = req.query.lokasi;

    // Menyimpan lokasi sebagai properti dari objek req
    req.lokasi = lokasi;

      // Query untuk mengambil data booking berdasarkan lokasi
    const booking = await sequelize.query(
      "SELECT * FROM bookings WHERE id_lokasi = :lokasi",
      {
        replacements: { lokasi: lokasi },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    console.log("booking: ", booking)

    return res.render("server/dashboardServer", {
      baseUrl: getBaseUrl(req),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Terjadi Kesalahan Sistem",
    });
  }
};

const pageServer = async (req, res) => {
  try {
    return res.render("server", {
      baseUrl: getBaseUrl(req),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Terjadi Kesalahan Sistem",
    });
  }
};

const dataUser = async (req, res) => {
  try {
    const data = await sequelize.query("SELECT * FROM users", {
      type: Sequelize.QueryTypes.SELECT,
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

const dataVoucher = async (req, res) => {
  try {
    const data = await sequelize.query("SELECT * FROM vouchers", {
      type: Sequelize.QueryTypes.SELECT,
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

const dataProduk = async (req, res) => {
  try {
    const data = await sequelize.query("SELECT * FROM produks", {
      type: Sequelize.QueryTypes.SELECT,
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};




module.exports = {
  pageDashboard,
  pageServer,
  dataUser,
  dataVoucher,
  dataProduk,
};
