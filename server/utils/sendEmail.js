import nodemailer from "nodemailer"

// use nodemailer with mailersend
const transporter = nodemailer.createTransport({
  host: "smtp.mailersend.net",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({to, subject, body}) => {
    const email = await transporter.sendMail({
        from: process.env.EMAIL_SENDER,
        to,
        subject,
        html: body
    })
    return email
} 

export default sendEmail