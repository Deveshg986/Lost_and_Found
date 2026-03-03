const { time } = require("console");
const multer = require("multer");
const path = require("path");

//Storage Field 
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "uploads/");
    },
    filename:(req, file, cb)=>{
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName); 
    }
});

const fileFilter = (req, file, cb)=>{
    const allowedTypes = /jpeg|jpg|png/;
    
}