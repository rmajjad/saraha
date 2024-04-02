import nodemailer from 'nodemailer';

async function SendEmail(to,subject,html) {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.emailSender,
            pass: process.env.passSender,
        },
    });
    const info = await transporter.sendMail({
        from: `Rama <${process.env.emailSender}>`,
        to,
        subject,
        html,
    });
}
export default SendEmail;