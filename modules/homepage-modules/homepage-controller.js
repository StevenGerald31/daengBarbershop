const getBaseUrl = require("../../utils/getBaseUrl");
const { sequelize, Sequelize } = require("../../db");
const dataUsers = require("../models/user-models");
const pageServer = require("../server-modules/server-controller");
const pageAdmin = require("../admin-modules/admin-controller");
const axios = require("axios");

const Landingpage = async (req, res) => {
  try {
    return res.render("homepage/landingpage", {
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

const Loginpage = async (req, res) => {
  try {
    return res.render("Login", {
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
      email: email,
      password: password,
    });

    if (response.status != 200) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = response.data.user;

    req.session.dataUser = {
      role_user: user.id_role,
      lokasi: user.id_lokasi,
    };
    const lokasiUser = user.id_lokasi;
    if (user.id_role === 1) {
      // Render admin page if id_role is 1
      res.redirect(`/admin/coba?lokasi=${lokasiUser}`);
    } else if (user.id_role === 2) {
      // Render server page if id_role is 2
      res.redirect(`/server/dashboard?lokasi=${lokasiUser}`);
    } else {
      // Handle other cases, maybe render a default page or return an error
      return res.status(403).json({ message: "Unauthorized role" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

const data_pelanggan = async (req, res) => {
  try {
    const lokasiUser = req.session.dataUser.lokasi;
    const pelanggan = await sequelize.query(
      "SELECT * FROM users WHERE id_lokasi = :lokasi AND id_role = 3",
      {
        replacements: { lokasi: lokasiUser },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    res.json(pelanggan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

const data_booking = async (req, res) => {
  try {
    const lokasiUser = req.session.dataUser.lokasi;
    const bookings = await sequelize.query(
      "SELECT bookings.*, users.name FROM bookings INNER JOIN users ON bookings.id_user = users.id_user WHERE bookings.id_lokasi = :lokasi",
      {
        replacements: { lokasi: lokasiUser },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

const data_stok = async (req, res) => {
  try {
    const lokasiUser = req.session.dataUser.lokasi;
    const stokProduk = await sequelize.query(
      "SELECT stockproduks.*, produks.nama FROM stockproduks INNER JOIN produks ON stockproduks.id_produk = produks.id_produk WHERE stockproduks.id_lokasi = :lokasi",
      {
        replacements: { lokasi: lokasiUser },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    res.json(stokProduk);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

module.exports = {
  Landingpage,
  Loginpage,
  loginUser,
  data_booking,
  data_stok,
  data_pelanggan,
};
