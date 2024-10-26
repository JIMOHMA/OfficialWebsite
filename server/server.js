require('dotenv').config()
const cors = require('cors')
const express = require('express')
const nodemailer = require('nodemailer')
const app = express()

app.use(cors())
app.use(express.json());

app.get('/',  (req, res) => {
    res.send('DONE!')
})

app.post('/portfolio-contact', async (req, res) => {
    // send the email to mail4ayodelemee@gmail.com
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or your email provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.NODEMAILER_APP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false // this allows self-signed certificates
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Portfolio Form Submission - ${req.body.subject}`,
        text: `Someone sent you a message from your portfolio`,
        html: `
            From: ${req.body.email}
            <br>
            Fullname: ${req.body.fullname}
            <br>
            Phone Number: ${req.body.number}
            <br>
            <br>
            Message: ${req.body.message}
            `
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log("Sent email successfully!!!");
        res.json({message: "Email Sent! We'll be in touch soon!"})
        
    } catch (error) {
        console.error("Error sending email:", error);
        res.json({message: "Message Not Sent. Please Try Again!"})
    }
})


const PORT = 4000
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})