import nodemailer from 'nodemailer'

console.log('SENDER_EMAIL:', process.env.SENDER_EMAIL); // Debug
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);     
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure:false,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

export default transporter