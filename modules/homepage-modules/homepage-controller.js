const getBaseUrl = require("../../utils/getBaseUrl");
const { sequelize, Sequelize } = require("../../db");
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

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
//       email: email,
//       password: password,
//     });

//     if (response.status != 200) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//     const user = response.data.user;

//     req.session.dataUser = {
//       role_user: user.id_role,
//       lokasi: user.id_lokasi,
//     };
//     const lokasiUser = user.id_lokasi;
//     if (user.id_role === 1) {
//       // Render admin page if id_role is 1
//       res.redirect(`/admin/coba?lokasi=${lokasiUser}`);
//     } else if (user.id_role === 2) {
//       // Render server page if id_role is 2
//       res.redirect(`/server/dashboard?lokasi=${lokasiUser}`);
//     } else {
//       // Handle other cases, maybe render a default page or return an error
//       return res.status(403).json({ message: "Unauthorized role" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred while logging in" });
//   }
// };

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
      email: email,
      password: password,
    });

    // Periksa apakah respons memiliki status 200 atau 201
    if (response.status !== 200 && response.status !== 201) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = response.data.user;
    const token = response.data.access_token; // Sesuaikan dengan respons API Anda

    // Pastikan token tersedia sebelum menyimpan ke session
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token not provided" });
    }

    // Simpan data pengguna dan token dalam session
    req.session.dataUser = {
      role_user: user.id_role,
      lokasi: user.id_lokasi,
      token: token,
    };

    const lokasiUser = user.id_lokasi;

    // Redirect ke halaman sesuai dengan role pengguna
    if (user.id_role === 1) {
      res.redirect(`/admin/coba?lokasi=${lokasiUser}`);
    } else if (user.id_role === 2) {
      res.redirect(`/server/dashboard?lokasi=${lokasiUser}`);
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

// const data_pelanggan = async (req, res) => {
//   try {
//     const lokasiUser = req.session.dataUser.lokasi;
//     const pelanggan = await sequelize.query(
//       "SELECT * FROM users WHERE id_lokasi = :lokasi AND id_role = 3",
//       {
//         replacements: { lokasi: lokasiUser },
//         type: Sequelize.QueryTypes.SELECT,
//       }
//     );
//     res.json(pelanggan);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred while fetching data" });
//   }
// };

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

const view_data_request = async (req, res) => {
  try {
    // Ambil token dari session
    const token = req.session.dataUser.token;

    // Pastikan token tersedia
    if (!token) {
      return res
        .status(401)
        .json({ error: "Authentication token not provided" });
    }

    // Sertakan token dalam header Authorization
    const response = await axios.get(
      "http://127.0.0.1:8000/api/bookings/request",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Ambil array request dari response.data
    const request = response.data.bookings;

    console.log("Data request: ", request);
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "An error occurred while fetching data",
    });
  }
};

const view_data_reserved = async (req, res) => {
  try {
    // Ambil token dari session
    const token = req.session.dataUser.token;

    // Pastikan token tersedia
    if (!token) {
      return res
        .status(401)
        .json({ error: "Authentication token not provided" });
    }

    // Sertakan token dalam header Authorization
    const response = await axios.get(
      "http://127.0.0.1:8000/api/bookings/reserved",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Ambil array reserved dari response.data
    const reserved = response.data.bookings;

    res.json(reserved);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "An error occurred while fetching data",
    });
  }
};

const view_all_data_booking = async (req, res) => {
  try {
    // Ambil token dari session
    const token = req.session.dataUser.token;

    // Pastikan token tersedia
    if (!token) {
      return res
        .status(401)
        .json({ error: "Authentication token not provided" });
    }

    // Sertakan token dalam header Authorization
    const response = await axios.get(
      "http://127.0.0.1:8000/api/bookings/showAllServerBookings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Ambil array reserved dari response.data
    const allData = response.data.bookings;

    console.log("All Data: ", allData);
    res.json(allData);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "An error occurred while fetching data",
    });
  }
};

const confirmBooking = async (req, res) => {
  const { bookingId } = req.params;
  const token = req.session.dataUser.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token not provided" });
  }

  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/bookings/${bookingId}/confirm`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return res.status(200).json({
        message: "Booking confirmed successfully",
        booking: response.data,
      });
    } else {
      return res
        .status(response.status)
        .json({ message: response.data.message });
    }
  } catch (error) {
    console.error("Error confirming booking:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while confirming the booking" });
  }
};

const finishBooking = async (req, res) => {
  const { bookingId } = req.params;
  const token = req.session.dataUser.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token not provided" });
  }

  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/bookings/${bookingId}/finish`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return res.status(200).json({
        message: "Booking confirmed successfully",
        finish: response.data,
      });
    } else {
      return res
        .status(response.status)
        .json({ message: response.data.message });
    }
  } catch (error) {
    console.error("Error confirming booking:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while confirming the booking" });
  }
};

const canceledBooking = async (req, res) => {
  const { bookingId } = req.params;
  const token = req.session.dataUser.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token not provided" });
  }

  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/bookings/${bookingId}/reject`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return res.status(200).json({
        message: "Booking cancel successfully",
        cancel: response.data,
      });
    } else {
      return res
        .status(response.status)
        .json({ message: response.data.message });
    }
  } catch (error) {
    console.error("Error confirming booking:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while confirming the booking" });
  }
};

const view_all_data_produk = async (req, res) => {
  const token = req.session.dataUser.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token not provided" });
  }

  try {
    // Sertakan token dalam header Authorization
    const response = await axios.get("http://127.0.0.1:8000/api/stockproduk", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Ambil array reserved dari response.data
    const allDataProduk = response.data;

    res.json(allDataProduk);
  } catch (error) {
    console.error("Error confirming booking:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while confirming the booking" });
  }
};

const tambah_jenis_produk = async (req, res) => {
  const token = req.session.dataUser.token;
  const { jenisproduk, nama, deskripsi, harga, gambar } = req.body;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token not provided" });
  }

  try {
    // Sertakan token dalam header Authorization
    const response = await axios.post(
      "http://127.0.0.1:8000/api/tambahJenisProduk",
      {
        jenisproduk,
        nama,
        deskripsi,
        harga,
        gambar,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle the response
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const data_reserved = async (req, res) => {
  try {
    // Ambil token dari session
    const token = req.session.dataUser.token;

    // Pastikan token tersedia
    if (!token) {
      return res
        .status(401)
        .json({ error: "Authentication token not provided" });
    }

    // Sertakan token dalam header Authorization
    const response = await axios.get(
      "http://127.0.0.1:8000/api/bookings/request",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Ambil array bookings dari response.data
    const bookings = response.data.bookings;

    console.log("Data booking: ", bookings);
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "An error occurred while fetching data",
    });
  }
};

const cancelled_booking = async (req, res) => {
  try {
    const response = await axios.get();
  } catch (error) {}
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
  view_data_request,
  view_data_reserved,
  data_stok,
  data_pelanggan,
  confirmBooking,
  canceledBooking,
  finishBooking,
  view_all_data_booking,
  view_all_data_produk,
  tambah_jenis_produk,
};
