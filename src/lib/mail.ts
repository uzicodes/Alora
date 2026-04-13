import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export const sendOrderEmail = async (to: string, name: string, orderId: string, total: number) => {
    const mailOptions = {
        from: `"Alora System" <${process.env.GMAIL_USER}>`,
        to,
        subject: `Order Confirmed: ${orderId}`,
        // --- YOUR CUSTOM TEMPLATE START ---
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 4px solid black; padding: 40px; background-color: white;">
        <h1 style="text-transform: uppercase; font-weight: 900; letter-spacing: -1px; border-bottom: 4px solid black; padding-bottom: 10px;">ALORA</h1>
        <p style="font-weight: bold; font-size: 18px; margin-top: 30px;">THANK YOU, ${name.toUpperCase()}!</p>
        <p>Your order <strong>${orderId}</strong> has been successfully placed and is now being prepared for shipping.</p>
        
        <div style="background-color: #f4f4f5; padding: 20px; border: 2px solid black; margin-top: 20px;">
          <p style="margin: 0; font-weight: bold;">ORDER TOTAL: BDT ${total}</p>
          <p style="margin: 0; font-size: 12px; color: #555;">Payment Method: SSLCommerz / Digital</p>
        </div>

        <p style="margin-top: 30px; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">
          Authorized Transaction • System Generated Email
        </p>
      </div>
    `,
        // --- YOUR CUSTOM TEMPLATE END ---
    };

    return transporter.sendMail(mailOptions);
};