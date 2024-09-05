const getBaseUrl = require("../../utils/getBaseUrl");

const pageDashboard = async (req, res) => {
  try {
    // Check if the user is logged in by verifying if session data exists
    if (!req.session || !req.session.dataUser) {
      return res
        .status(401)
        .send(
          `<script>alert('Silahkan Login terlebih dahulu'); window.location.href='/web/loginpage';</script>`
        );
    }

    // If the user is logged in, proceed to render the dashboard page
    return res.render("server/dashboardServer", {
      baseUrl: getBaseUrl(req),
      lokasiUser: req.session.dataUser.lokasi, // Passing the user's location
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
