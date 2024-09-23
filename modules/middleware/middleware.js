const { jwtDecode } = require("jwt-decode");

// Middleware untuk memeriksa otentikasi
function isAuthenticated(req, res, next) {
  const token = req.session.dataUser.token;
  console.log(token);

  if (token) {
    console.log(token);
    try {
      // Mendekode token tanpa verifikasi
      const decoded = jwtDecode(token);

      // Menyimpan data pengguna ke dalam request
      req.user = decoded;
      console.log(decoded);
      next();
    } catch (err) {
      // Jika terjadi error saat mendekode token
      return res.redirect("/web/loginpage");
    }
  } else {
    res.redirect("/web/loginpage");
  }
}

// Middleware untuk memeriksa otorisasi berdasarkan role tetap sama
function authorize(allowedRoles = []) {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.id_role)) {
      next();
    } else {
      res
        .status(403)
        .send("Forbidden: You do not have permission to access this resource.");
    }
  };
}

module.exports = {
  isAuthenticated,
  authorize,
};
