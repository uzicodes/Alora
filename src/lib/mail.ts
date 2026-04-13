import nodemailer from "nodemailer";
import { generateOrderEmailHtml } from "./email-templetes/OrderEmail";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export const sendOrderEmail = async (order: any) => {
    const mailOptions = {
        from: `"Alora System" <${process.env.GMAIL_USER}>`,
        to: order.email,
        subject: `Order Confirmed: #${order.id.slice(-8)}`,
        html: generateOrderEmailHtml(order),
    };

    return transporter.sendMail(mailOptions);
};