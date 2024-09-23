const getBaseUrl = require("../../utils/getBaseUrl");
const axios = require("axios");

//API UTAMA
const apiClient = axios.create({
  baseURL: "http://api.daengbarbershop.my.id",
  headers: {
    "Content-Type": "application/json",
  },
});

//FUNCTION

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
    const response = await apiClient.post("/api/auth/login", {
      email: email,
      password: password,
    });

    const user = response.data.user;
    const token = response.data.access_token;

    if (!token) {
      // Jika token tidak tersedia, kirim pesan kesalahan ke template
      return res.render("Login", {
        error: "Autentikasi gagal. Silakan coba lagi.",
      });
    }

    req.session.dataUser = {
      role_user: user.id_role,
      lokasi: user.id_lokasi,
      token: token,
    };

    const lokasiUser = user.id_lokasi;

    if (user.id_role === "1") {
      return res.redirect(`/admin/coba?lokasi=${lokasiUser}`);
    } else if (user.id_role === "2") {
      return res.redirect(`/server/dashboard?lokasi=${lokasiUser}`);
    } else {
      // Jika role tidak dikenali, kirim pesan kesalahan
      return res.render("Login", {
        error: "Role pengguna tidak dikenali.",
      });
    }
  } catch (error) {
    console.error(error);

    // Jika ada error dari server atau kredensial salah
    if (error.response) {
      if (error.response.status === 401) {
        // Kredensial salah, kirim pesan kesalahan
        return res.render("Login", { error: "Email atau password salah." });
      } else {
        // Error lain dari server
        return res.render("Login", {
          error: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
        });
      }
    } else if (error.request) {
      // Tidak ada respons dari server
      return res.render("Login", {
        error: "Tidak ada respons dari server. Periksa koneksi Anda.",
      });
    } else {
      // Error saat mengatur permintaan
      return res.render("Login", {
        error:
          "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      });
    }
  }
};

const logoutUser = async (req, res) => {
  const token = req.session.dataUser?.token;

  // Pastikan token tersedia sebelum melanjutkan
  if (!token) {
    return res
      .status(401)
      .send(
        `<script>alert('Authentication token not provided'); window.location.href='/web/loginpage';</script>`
      );
  }

  try {
    delete req.session.dataUser;
    // Lakukan request logout ke backend
    const response = await apiClient.post(
      "/api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Jika logout berhasil, hapus data session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res
          .status(500)
          .send(
            `<script>alert('Error logging out'); window.location.href='/web/dashboard';</script>`
          );
      }

      // Tampilkan pesan berhasil dan arahkan ke halaman login
      return res.send(
        `<script>alert('${response.data.message}'); window.location.href='/web/loginpage';</script>`
      );
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return res
      .status(500)
      .send(
        `<script>alert('An error occurred while logging out: ${
          error.response?.data?.message || error.message
        }'); window.location.href='/web/dashboard';</script>`
      );
  }
};

const data_pelanggan = async (req, res) => {
  try {
    const response = await apiClient.get("/api/customers");
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
    const response = await apiClient.get("/api/bookings/request", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const response = await apiClient.get("/api/bookings/reserved", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

const view_data_confirm = async (req, res) => {
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
    const response = await apiClient.get("/api/bookings/confirm", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Ambil array reserved dari response.data
    const confirmed = response.data.bookings;

    console.log("Data confirmed: ", confirmed);
    res.json(confirmed);
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
    const response = await apiClient.get(
      "/api/bookings/showAllServerBookings",
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
    const response = await apiClient.put(
      `/api/bookings/${bookingId}/confirm`,
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
    const response = await apiClient.put(
      `/api/bookings/${bookingId}/finish`,
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
    const response = await apiClient.put(
      `/api/bookings/${bookingId}/reject`,
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
    const response = await apiClient.get("/api/produk/jenis", {
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
  const { jenisproduk, nama, deskripsi, harga, stok } = req.body;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token not provided" });
  }

  try {
    const response = await apiClient.post(
      "/api/produk/tambahjenisproduk",
      { jenisproduk, nama, deskripsi, harga, stok },
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

const update_Produk = async (req, res) => {
  const token = req.session.dataUser.token;
  const { nama, deskripsi, harga, gambar, jenisproduk, id_produk } = req.body;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token not provided" });
  }

  try {
    const response = await apiClient.put(
      `/api/produk/update/${id_produk}`,
      { nama, deskripsi, harga, gambar, jenisproduk, id_produk },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the product" });
  }
};

const hapus_Produk = async (req, res) => {
  const token = req.session.dataUser.token;
  const { id_produk } = req.body;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token not provided" });
  }

  try {
    const response = await apiClient.delete(`/api/produk/hapus/${id_produk}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res
      .status(response.status)
      .json({ message: "Produk deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the product" });
  }
};

const update_stok = async (req, res) => {
  const token = req.session.dataUser?.token;
  const { stok, id_stockproduk } = req.body;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token not provided" });
  }

  try {
    const response = await apiClient.put(
      `/api/stockproduk/${id_stockproduk}`,
      {
        stok,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("tambah stok: ", response.data);

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
    const response = await apiClient.post(
      `/api/changePassword/${id_user}`,
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

const checkout = async (req, res) => {
  const token = req.session.dataUser.token;
  const { metode_pembayaran, no_telp, items } = req.body;

  // Pastikan token tersedia
  if (!token) {
    return res.status(401).json({ error: "Authentication token not provided" });
  }

  try {
    const response = await apiClient.post(
      `/api/transaction`,
      {
        metode_pembayaran: metode_pembayaran,
        no_telp: no_telp,
        items: items,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Cek jika responsenya adalah 400 dan errornya karena point tidak cukup
    if (
      response.status === 400 &&
      response.data.error === "Pengguna tidak memiliki cukup point"
    ) {
      return res.status(400).json({ error: "Point tidak cukup" });
    }

    // Jika transaksi berhasil, teruskan data ke frontend
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);

    // Jika error dari server Laravel
    if (error.response && error.response.status === 400) {
      return res.status(400).json({ error: error.response.data.error });
    }

    // Jika terjadi error lain
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const checkout_nonmember = async (req, res) => {
  const token = req.session.dataUser.token;
  const { metode_pembayaran, items } = req.body;

  // Pastikan token tersedia
  if (!token) {
    return res.status(401).json({ error: "Authentication token not provided" });
  }

  try {
    // Mengirimkan permintaan POST ke API transaksi non-member
    const response = await apiClient.post(
      `/api/transactions/non-member`,
      {
        metode_pembayaran: metode_pembayaran,
        items: items,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Jika transaksi berhasil, teruskan data ke frontend
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);

    // Jika error dari server Laravel
    if (error.response && error.response.status === 400) {
      return res.status(400).json({ error: error.response.data.error });
    }

    // Jika terjadi error lain
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  Landingpage,
  Loginpage,
  loginUser,
  logoutUser,
  view_data_request,
  view_data_reserved,
  view_data_confirm,
  data_pelanggan,
  confirmBooking,
  canceledBooking,
  finishBooking,
  view_all_data_booking,
  view_all_data_produk,
  tambah_jenis_produk,
  update_stok,
  update_Produk,
  hapus_Produk,
  resetPassword,
  checkout,
  checkout_nonmember,
  apiClient,
};
