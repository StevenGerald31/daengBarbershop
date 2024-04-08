const { DataTypes } = require("sequelize");
const { sequelize, Sequelize } = require("../../db");

const Users = sequelize.define(
  "Users",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    no_telp: { type: DataTypes.STRING },
    tanggal_lahir: { type: DataTypes.DATE },
    jenis_kelamin: { type: DataTypes.STRING },
    alamat: { type: DataTypes.STRING },
    id_lokasi: { type: DataTypes.INTEGER },
    email: { type: DataTypes.STRING, unique: true },
    id_role: { type: DataTypes.INTEGER },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = Users;
