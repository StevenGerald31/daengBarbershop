const getBaseUrl = require("../../utils/getBaseUrl");
const axios = require("axios");

const pageCoba = async (req, res) => {
  try {
    return res.render("admin/cobaAdmin", {
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

const data_pelanggan = async (req, res) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/customers");
    const pelanggan = response.data;
    res.json(pelanggan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

const data_server = async (req, res) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/servers");
    const server = response.data;
    res.json(server);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

const data_lokasi = async (req, res) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/lokasis");
    const lokasi = response.data;
    res.json(lokasi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

const tambah_server = async (req, res) => {
  const {
    name,
    password,
    no_telp,
    tanggal_lahir,
    jenis_kelamin,
    alamat,
    email,
    id_lokasi,
  } = req.body;
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/addServer", {
      name,
      password,
      no_telp,
      tanggal_lahir,
      jenis_kelamin,
      alamat,
      email,
      id_lokasi,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  pageCoba,
  data_pelanggan,
  data_server,
  data_lokasi,
  tambah_server,
};
