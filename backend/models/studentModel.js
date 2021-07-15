const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
    {
        zona: {
            type: String,
            required: false,
        },
        distrito: {
            type: String,
            required: false,
        },
        amie: {
            type: String,
            required: false,
        },
        institucion: {
            type: Boolean,
            required: false,
            default: false,
        },
        sostenimiento: {
            type: Boolean,
            required: false,
        },
        especialidad: {
            type: String,
            required: false,
        },
        grado: {
            type: String,
            required: false,
        },
        cedula: {
            type: String,
            required: false,
        },
        nombres: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Student", studentSchema);
