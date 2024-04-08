const getBaseUrl = require("../../utils/getBaseUrl");
const { sequelize, Sequelize } = require("../../db");
const dataUsers = require("../models/user-models");
const pageServer = require("../server-modules/server-controller");
const pageAdmin = require("../admin-modules/admin-controller");

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

const server = pageServer.pageDashboard;
const admin = pageAdmin.pageCoba;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminuser = await dataUsers.findOne({ where: { email, password } });
    if (!adminuser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check the id_role of the user
    if (adminuser.id_role === 1) {
      // Render admin page if id_role is 1
      admin(req, res);
    } else if (adminuser.id_role === 2) {
      // Render server page if id_role is 2
      server(req, res);
    } else {
      // Handle other cases, maybe render a default page or return an error
      return res.status(403).json({ message: "Unauthorized role" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

module.exports = { Landingpage, Loginpage, loginUser };
