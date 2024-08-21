const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const cors = require("cors");
const multer = require("multer");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(
  session({
    secret: "barberShop",
    resave: false,
    saveUninitialized: false,
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/images/"); // Ensure this path exists and is writable
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
    // file.mimetype === "application/pdf" ||
    // file.mimetype === "text/csv" ||
    // file.mimetype === "application/vnd.ms-excel" ||
    // file.mimetype ===
    //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: storage, fileFilter: fileFilter }).single("file"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  return res.render("error", {
    message: err.message,
    error: err,
  });
});

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

module.exports = app;
