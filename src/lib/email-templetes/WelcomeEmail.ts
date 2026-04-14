export const getWelcomeEmailHTML = (user: { name: string }) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Welcome to ALORA</title>
      <style type="text/css">
        @media only screen and (max-width:600px) { .main-box { width:100%!important; } }
      </style>
    </head>
    <body style="margin:0; padding:0; background-color:#FFE599; font-family:arial, sans-serif;">
      <div style="background-color:#FFE599; padding:40px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" class="main-box" style="border:3px solid #000; background-color:#f2ecaa;">
          <tr>
            <td align="center" style="padding:40px 0 20px 0;">
              <h1 style="margin:0; font-weight:900; text-transform:uppercase; letter-spacing:-2px; font-size:48px; color:#000;">ALORA</h1>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:0 40px;">
              <div style="width:100%; height:2px; background-color:#000; margin-bottom:30px;"></div>
              <h2 style="font-size:28px; margin:0; text-transform:uppercase; color:#000;">Welcome to the World of Alora</h2>
              <p style="font-size:16px; line-height:24px; color:#333; margin:20px 0;">
                Hi ${user.name || 'there'}, we're thrilled to have you here. Your journey into the world of fine, signature fragrances starts today.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:30px 0 40px 0;">
              <a href="https://alora.vercel.app/shop" style="background-color:#000; color:#fff; text-decoration:none; padding:15px 35px; font-weight:bold; text-transform:uppercase; font-size:14px; letter-spacing:1px; display:inline-block;">
                Explore The Collection
              </a>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px; border-top:1px solid #000; background-color:#e8e2a0;">
              <p style="font-size:12px; color:#555; margin:0;">
                This is a system generated welcome message.<br>
                © 2026 ALORA. All Rights Reserved. Dhaka, Bangladesh.
              </p>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;
};