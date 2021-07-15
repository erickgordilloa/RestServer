const asyncHandler = require("express-async-handler");
const ExcelJS = require("exceljs");
const Student = require("../models/studentModel");

// @desc    Search student by cedula
// @route   GET /api/students/:cedula
// @access  public
const searchStudent = asyncHandler(async (req, res) => {
    const { cedula } = req.params;
    const student = await Student.findOne({ cedula });
    if (student) {
        res.json(student);
    } else {
        res.status(404);
        throw new Error("Student not found");
    }
    res.json(student);
});

// @desc    import file excel
// @route   POST /api/students
// @access  Admin
const importStudent = asyncHandler(async (req, res) => {
    const buffer = req.files["file"].data;

    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(buffer);

    const sheet = wb.getWorksheet("nocturnas-ebjas- semip");

    const data = [];

    sheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
            const student = [];

            row.eachCell(cell => {
                student.push(cell.value.trim());
            });

            const [
                zona,
                distrito,
                amie,
                institucion,
                sostenimiento,
                especialidad,
                grado,
                cedula,
                nombres,
            ] = student;

            const studentObj = {
                zona,
                distrito,
                amie,
                institucion,
                sostenimiento,
                especialidad,
                grado,
                cedula,
                nombres,
            };

            data.push(studentObj);
        }
    });

    // Saving in MongoDB
    await Student.insertMany(data);

    res.json({
        status: "success",
        count: data.length,
        estudiantes: data,
    });
});

exports.searchStudent = searchStudent;
exports.importStudent = importStudent;