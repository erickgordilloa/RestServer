const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const fileupload = require("express-fileupload");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const express = require('express');

dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app);

//permitir el acceso o llamadas ajax al api desde cualquier frontend
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //cualquier frente puede hacer peticiones ajax
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Allow", "*");
    next();
});
app.use(fileupload());

app.get("/", (req, res) => {
    res.send("API is running...");
});

/* routes */
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
/* routes */

const PORT = process.env.PORT || 5000;

server.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} on port ${PORT}`
    )
);