require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const claimRoutes = require("./routes/claimRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//test route

app.get("/",(req, res)=>{
    res.send("API is Running")
})
// serve uploaded images
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/claims", claimRoutes);

db.connect((err) => {
    if (err) {
        console.log("Database Connection Error", err);
    } else {
        console.log("Database Connected");
    }
});

app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});