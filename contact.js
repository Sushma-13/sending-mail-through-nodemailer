const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
/**
 * Do allow less secure apps to send mails, visit
 * https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4MD-E95_WZn8vMLTNNNg9QNTGpxMGj8VVN1UuQ6uZSkxQqFp3VX47dQY2V0RteyBhBGz6lxvwZDyRq93hvEaeDgFAwd8g
 *  if we do not allow this, then we would not be able to send mails
 */

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: "xyz@gmail.com",
        pass: "your login password",
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});

router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "xyz@gmail.com",
        subject: "Contact Form Message",
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "failed" });
        } else {
            res.json({ status: "sent" });
        }
    });
});

router.get("/contact", (req, res) => {
    res.send("contacted");
})
module.exports = router;