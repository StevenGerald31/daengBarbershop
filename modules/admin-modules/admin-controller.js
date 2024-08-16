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

const data_konten = async (req, res) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/contents");
    const content = response.data;
    res.json(content);
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

// Fungsi untuk menambahkan lokasi
const tambah_lokasi = async (req, res) => {
  const { nama, alamat, kota, kodepos } = req.body;

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/lokasis", {
      nama,
      alamat,
      kota,
      kodepos,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Tambah fungsi untuk delete lokasi
const delete_lokasi = async (req, res) => {
  const { id_lokasi } = req.params;

  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/lokasis/${id_lokasi}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during delete:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Tambah fungsi untuk edit lokasi
const edit_lokasi = async (req, res) => {
  const { id_lokasi } = req.params;
  const { nama, alamat, kota, kodepos } = req.body;

  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/lokasis/${id_lokasi}`,
      {
        nama,
        alamat,
        kota,
        kodepos,
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during update:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
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

const resetPassword = async (req, res) => {
  const token = req.session.dataUser.token;
  const { newPassword, id_user } = req.body;

  // Pastikan token tersedia
  if (!token) {
    return res.status(401).json({ error: "Authentication token not provided" });
  }

  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/changePassword/${id_user}`,
      {
        new_password: newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const tambah_konten = async (req, res) => {
  const { title, description, image_path, expiry_date } = req.body;

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/contents", {
      title,
      description,
      image_path,
      expiry_date,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const delete_konten = async (req, res) => {
  const { id } = req.params;
  console.log(`Menghapus konten dengan ID: ${id}`); // Logging tambahan

  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/contents/${id}`
    );
    console.log("Response from API:", response.data); // Logging respons dari API

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during delete:", error.message); // Logging error lebih jelas
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const deleteExpiredContent = async (req, res) => {
  try {
    const response = await axios.delete(
      "http://127.0.0.1:8000/api/contents/expired/delete"
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error deleting expired contents:", error.message || error);
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
  tambah_lokasi,
  delete_lokasi,
  edit_lokasi,
  tambah_server,
  resetPassword,
  data_konten,
  tambah_konten,
  delete_konten,
  deleteExpiredContent,
};
