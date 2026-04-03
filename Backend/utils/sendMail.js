const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

const sendMail = async (to, subject, html)=>{
    try {
        await transporter.sendMail({
            from: `Lost and Found <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });
        alert("Mail sent Successfully")
    } catch (err) {
        console.log("Mail error", err);
    }
};

module.exports = sendMail;