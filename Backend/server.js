require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use("/uploads", express.static("uploads"));
=======
>>>>>>> f75c8b274ae81c07ad25b3d559f1e72b889ee322

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

db.connect((err) => {
    if (err) {
        console.log("Database Connection Error", err);
    } else {
        console.log("Database Connected");

        app.listen(PORT, () => {
            console.log(`Server Started at PORT ${PORT}`);
        });
    }
});