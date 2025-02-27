const getBaseUrl = require("../../utils/getBaseUrl");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const formdata = require("form-data");

//API UTAMA
const apiClient = axios.create({
  baseURL: "http://api.daengbarbershop.my.id",
  headers: {
    "Content-Type": "application/json",
  },
});

//FUNGCTION

// const tambah_konten = async (req, res) => {
//   upload(req, res, async function (err) {
//     if (err) {
//       console.error("File upload error:", err);
//       return res
//         .status(500)
//         .json({ error: "File upload error: " + err.message });
//     }

//     if (!req.file) {
//       return res.status(422).json({ error: "No image file uploaded" });
//     }

//     const { title, description, expiry_date, image_path } = req.body;
//     // const image_path = req.file.path;

//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("image_path", image_path.files[0]);
//       formData.append("expiry_date", expiry_date);

//       const response = await axios.post(
//         // "http://api.daengbarbershop.my.id/api/contents",
//         "http://127.0.0.1:8000/api/contents",
//         formData,
//         {
//           headers: {
//             ...formData.getHeaders(),
//           },
//         }
//       );

//       console.log("Response from PHP API:", response.data); // Tambahkan logging respon dari API PHP

//       res.status(response.status).json(response.data);
//     } catch (error) {
//       if (error.response) {
//         console.error(
//           "Server responded with status code:",
//           error.response.status
//         );
//         console.error("Response data:", error.response.data);
//         res.status(error.response.status).json(error.response.data);
//       } else {
//         console.error("Error during API call:", error.message);
//         res
//           .status(500)
//           .json({ error: "Internal server error: " + error.message });
//       }
//     }
//   });
// };

// const tambah_konten = async (req, res) => {
//   const { title, description, expiry_date } = req.body;
//   // const image_path = req.file.path;

//   // Logging image_path
//   console.log("Image path:", image_path);

//   try {
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("image_path", fs.createReadStream(image_path));
//     formData.append("expiry_date", expiry_date);

//     const response = await axios.post("/api/contents", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         ...formData.getHeaders(),
//       },
//     });

//     console.log("Response from PHP API:", response.data); // Tambahkan logging respon dari API PHP

//     res.status(response.status).json(response.data);
//   } catch (error) {
//     if (error.response) {
//       console.error(
//         "Server responded with status code:",
//         error.response.status
//       );
//       console.error("Response data:", error.response.data);
//       res.status(error.response.status).json(error.response.data);
//     } else {
//       console.error("Error during API call:", error.message);
//       res
//         .status(500)
//         .json({ error: "Internal server error: " + error.message });
//     }
//   }
// };

const tambah_konten = async (req, res) => {
  const { title, description, expiry_date } = req.body;

  try {
    const response = await apiClient.post(
      "/api/contents",
      { title, description, expiry_date },
      {
        headers: {
          "Content-Type": "application/json",
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

// Function to add content with image upload
// const tambah_konten = async (req, res) => {
//   upload(req, res, async function (err) {
//     if (err) {
//       console.error("File upload error:", err);
//       return res
//         .status(500)
//         .json({ error: "File upload error: " + err.message });
//     }

//     if (!req.file) {
//       return res.status(422).json({ error: "No image file uploaded" });
//     }

//     const { title, description, expiry_date } = req.body;
//     const image_path = req.file.path;

//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append(
//         "image_path",
//         document.getElementById("image_path").files[0]
//       );
//       formData.append("expiry_date", expiry_date);

//       const response = await apiClient.post("/api/contents", formData, {
//         headers: {
//           ...formData.getHeaders(),
//         },
//       });

//       res.status(response.status).json(response.data);
//     } catch (error) {
//       if (error.response) {
//         console.error(
//           "Server responded with status code:",
//           error.response.status
//         );
//         console.error("Response data:", error.response.data);
//       } else {
//         console.error("Error during API call:", error.message);
//       }
//     }
//   });
// };

// const tambah_konten = async (req, res) => {
//   upload(req, res, async function (err) {
//     if (err) {
//       console.error("File upload error:", err);
//       return res
//         .status(500)
//         .json({ error: "File upload error: " + err.message });
//     }
//     console.log(req);

//     if (!req.file) {
//       return res.status(422).json({ error: "No image file uploaded" });
//     }

//     const { title, description, expiry_date } = req.body;
//     const image_path = req.file ? req.file.filename : null;

//     // Log the image path to the console
//     console.log("Image Path:", image_path);

//     if (!image_path) {
//       console.error("No image file uploaded");
//       return res.status(422).json({ error: "No image file uploaded" });
//     }

//     try {
//       const response = await apiClient.post("/api/contents", {
//         title,
//         description,
//         image_path,
//         expiry_date,
//       });

//       res.status(response.status).json(response.data);
//     } catch (error) {
//       console.error("Error during API call:", error);
//       res
//         .status(500)
//         .json({ error: error.response?.data?.message || "Error occurred" });
//     }
//   });
// };

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
            `<script>alert('Error logging out'); window.location.href='/admin/coba';</script>`
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
        }'); window.location.href='/admin/coba';</script>`
      );
  }
};

const pageCoba = async (req, res) => {
  try {
    // Check if the user is logged in by verifying if session data exists
    if (!req.session || !req.session.dataUser) {
      return res
        .status(401)
        .send(
          `<script>alert('Silahkan Login terlebih dahulu'); window.location.href='/web/loginpage';</script>`
        );
    }

    // If the user is logged in, proceed to render the cobaAdmin page
    return res.render("admin/cobaAdmin", {
      baseUrl: getBaseUrl(req),
      lokasiUser: req.session.dataUser.lokasi, // Passing user's location if needed
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
    const response = await apiClient.get("/api/customers");
    const pelanggan = response.data;
    res.json(pelanggan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

const data_server = async (req, res) => {
  try {
    const response = await apiClient.get("/api/servers");
    const server = response.data;
    res.json(server);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

const data_lokasi = async (req, res) => {
  try {
    const response = await apiClient.get("/api/lokasis");
    const lokasi = response.data;

    // Send data to the client
    res.json(lokasi);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

// Fungsi untuk menambahkan lokasi
const tambah_lokasi = async (req, res) => {
  const { nama, alamat, kota, kodepos } = req.body;

  try {
    const response = await apiClient.post("/api/lokasis", {
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
  const { id_lokasi } = req.body;

  try {
    const response = await apiClient.delete(`/api/lokasis/${id_lokasi}`);
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
  const { nama, alamat, kota, kodepos } = req.body;
  const { id_lokasi } = req.params;

  try {
    const response = await apiClient.put(`/api/lokasis/${id_lokasi}`, {
      nama,
      alamat,
      kota,
      kodepos,
      id_lokasi,
    });

    console.log("Respons dari server setelah update:", response.data);

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
    const response = await apiClient.post("/api/addServer", {
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

const data_konten = async (req, res) => {
  try {
    const response = await apiClient.get("/api/contents");
    const content = response.data;
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

// const tambah_konten = async (req, res) => {
//   upload.single("image")(req, res, async (err) => {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ message: "File upload error", error: err.message });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ message: "Unknown error occurred", error: err.message });
//     }

//     const { title, description, expiry_date } = req.body;
//     const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//     try {
//       const response = await apiClient.post("/api/contents", {
//         title,
//         description,
//         image_path: imagePath,
//         expiry_date,
//       });

//       res.status(response.status).json(response.data);
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ message: "An error occurred", error: error.message });
//     }
//   });
// };

const delete_konten = async (req, res) => {
  const { id } = req.params;
  console.log(`Menghapus konten dengan ID: ${id}`); // Logging tambahan

  try {
    const response = await apiClient.delete(`/api/contents/${id}`);
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
    const response = await apiClient.delete("/api/contents/expired/delete");

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
  logoutUser,
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
  apiClient,
};
