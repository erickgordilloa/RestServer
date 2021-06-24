const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    cedula: {
      type: String,
      required: true,
      unique: true,
    },
    correo: {
      type: String,
      required: true,
    },
    sistema: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Usuario", usuarioSchema);
