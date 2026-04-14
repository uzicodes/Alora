import nodemailer from "nodemailer";
import { generateOrderEmailHtml } from "./email-templetes/OrderEmail";
import { getWelcomeEmailHTML } from "./email-templetes/WelcomeEmail";



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export const sendOrderEmail = async (order: any) => {
    const mailOptions = {
        from: `"ALORA PERFUMES" <${process.env.GMAIL_USER}>`,
        to: order.email,
        subject: `Your Order #${order.id.slice(-8).toUpperCase()} is Confirmed`,
        html: generateOrderEmailHtml(order),
    };

    return transporter.sendMail(mailOptions);
};



export const sendWelcomeEmail = async (user: { name: string; email: string }) => {
    const htmlContent = getWelcomeEmailHTML(user);

    const mailOptions = {
        from: `"ALORA" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: `Welcome to ALORA | Discover your signature scent`,
        html: htmlContent,
    };

    return transporter.sendMail(mailOptions);
};