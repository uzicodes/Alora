export function generateOrderEmailHtml(order: any) {
  const formattedDate = new Date(order.orderTime).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric"
  });

  const formattedAddress = order.address ? order.address.replace(/,/g, '<br>') : "Not Provided";
  const itemsJson = typeof order.items === 'string' ? JSON.parse(order.items) : (order.items || []);

  const itemsHtml = itemsJson.map((item: any) => `
             <tr>
              <td align="left" class="esdev-adapt-off" style="Margin:0;padding:10px 20px">
               <table cellpadding="0" cellspacing="0" class="esdev-mso-table" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:560px">
                 <tr>
                  <td valign="top" class="esdev-mso-td" style="padding:0;Margin:0">
                   <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:left">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;width:265px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                         <tr>
                          <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><strong style="font-weight:700 !important">${item.name}</strong></p></td>
                         </tr>
                         <tr>
                          <td align="left" style="padding:5px 0 0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Size: ${item.sizeMl ? item.sizeMl + 'ML' : 'N/A'}<br>Concentration: ${item.concentration || 'N/A'}</p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                  <td style="padding:0;Margin:0;width:20px"></td>
                  <td valign="top" class="esdev-mso-td" style="padding:0;Margin:0">
                   <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:left">
                     <tr>
                      <td align="left" style="padding:0;Margin:0;width:80px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                         <tr>
                          <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">${item.quantity} pcs</p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                  <td style="padding:0;Margin:0;width:20px"></td>
                  <td valign="top" class="esdev-mso-td" style="padding:0;Margin:0">
                   <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:right">
                     <tr>
                      <td align="left" style="padding:0;Margin:0;width:85px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                         <tr>
                          <td align="right" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">BDT ${item.price * item.quantity}</p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
    `).join("");

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>Alora Order Confirmed: #${order.id.slice(-8).toUpperCase()}</title>
  <style type="text/css">
  @font-face {
    font-family: 'Kharaissa';
    src: url('https://aloraa.vercel.app/fonts/Kharaissa.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  .rollover:hover .rollover-first {
  max-height:0px!important;
  display:none!important;
}
.rollover:hover .rollover-second {
  max-height:none!important;
  display:block!important;
}
.rollover span {
  font-size:0px;
}
u + .body img ~ div div {
  display:none;
}
#outlook a {
  padding:0;
}
span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color:inherit;
  mso-style-priority:99;
}
a.es-button {
  mso-style-priority:100!important;
  text-decoration:none!important;
}
a[x-apple-data-detectors],
#MessageViewBody a {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
}
.es-desk-hidden {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
}
@media only screen and (max-width:600px) {.es-m-p0r { padding-right:0px!important }.es-m-p0l { padding-left:0px!important }.es-m-p20b { padding-bottom:20px!important }.es-p-default { }*[class="gmail-fix"] { display:none!important }p, a { line-height:150%!important }h1, h1 a { line-height:120%!important }h2, h2 a { line-height:120%!important }h3, h3 a { line-height:120%!important }h4, h4 a { line-height:120%!important }h5, h5 a { line-height:120%!important }h6, h6 a { line-height:120%!important }h1 { font-size:36px!important; text-align:left }h2 { font-size:26px!important; text-align:left }h3 { font-size:20px!important; text-align:left }h4 { font-size:24px!important; text-align:left }h5 { font-size:20px!important; text-align:left }h6 { font-size:16px!important; text-align:left }.es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important }.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important }.es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important }.es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important }.es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important }.es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important }.es-menu td a { font-size:12px!important }.es-header-body p, .es-header-body a { font-size:14px!important }.es-content-body p, .es-content-body a { font-size:14px!important }.es-footer-body p, .es-footer-body a { font-size:14px!important }.es-infoblock p, .es-infoblock a { font-size:12px!important }.es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important }.es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important }.es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important }.es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important }.es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important }.es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important }.es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important; display:block }.es-m-txt-r .es-menu td { float:right!important }.es-m-txt-l .es-menu td { float:left!important }.es-m-txt-c .es-menu td { display:inline-block!important }.es-spacer { display:inline-table }a.es-button, button.es-button { display:inline-block!important; font-size:20px!important; padding:10px 20px 10px 20px!important; line-height:120%!important }.es-button-border { display:inline-block!important }.es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important }.es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu.es-table-not-adapt { display:inline-block!important }.es-adaptive table, .es-left, .es-right { width:100%!important; border-collapse:separate!important }.es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important }.adapt-img { width:100%!important; height:auto!important }.es-adapt-td { display:block!important; width:100%!important }.es-mobile-hidden, .es-hidden { display:none!important }.es-container-hidden { display:none!important }.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important }tr.es-desk-hidden { display:table-row!important }table.es-desk-hidden { display:table!important }td.es-desk-hidden { display:table-cell!important }td.es-desk-menu-hidden { display:table-cell!important }.es-menu td { width:1%!important }table.es-table-not-adapt, .esd-block-html table, .es-m-txt-r .es-menu td, .es-m-txt-l .es-menu td, .es-m-txt-c .es-menu td { width:auto!important }.h-auto { height:auto!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }</style>
 </head>
 <body class="body" style="width:100%;height:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#EFEFEF">
   <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:no-repeat;background-size:auto auto">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" style="padding:0;Margin:0;padding-top:40px;">
           <table bgcolor="#f2ecaa" align="center" cellpadding="0" cellspacing="0" class="es-content-body" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:#f2ecaa;width:600px;border: 4px solid black; box-shadow: 6px 6px 0px 0px #000;">
             <tr>
              <td align="center" style="padding:40px;Margin:0">
                <h1 style="font-family: 'Kharaissa', sans-serif; font-weight: normal; text-transform: uppercase; letter-spacing: 5px; border-bottom: 4px solid black; padding-bottom: 20px; font-size: 32px; color: #000; Margin: 0; text-align: center;">
                  <img src="https://aloraa.vercel.app/alora_BG.png" alt="Alora Logo" width="32" height="32" style="vertical-align: middle; margin-right: 8px; display: inline-block;" />
                  <span style="vertical-align: middle;">ALORA</span>
                </h1>
              </td>
             </tr>
             <tr>
              <td align="left" style="padding:0px 40px 0;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0 0 10px;Margin:0"><h1 class="es-m-txt-c" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:32px;font-style:normal;font-weight:bold;color:#333333">Your Order is Confirmed!</h1></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="padding:20px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><h2 class="es-m-txt-c" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:22px;font-style:normal;font-weight:bold;color:#333333">Order ID&nbsp;<a target="_blank" href="#" style="mso-line-height-rule:exactly;text-decoration:none;color:#000;font-size:22px">#${order.id.slice(-8).toUpperCase()}</a></h2></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding:5px 40px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">${formattedDate}</p></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding:5px 40px 15px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Thank you for your order, ${order.name}. Your fragrance is currently being prepped for shipment.</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             
             <!-- DYNAMIC ITEMS START -->
             ${itemsHtml}
             <!-- DYNAMIC ITEMS END -->

             <tr>
              <td align="left" style="padding:10px 20px 0;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                 <tr>
                  <td align="center" class="es-m-p0r" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;border-top:2px solid #000;border-bottom:2px solid #000" role="presentation">
                     <tr>
                      <td align="right" style="padding:10px 0 20px;Margin:0"><p class="es-m-txt-r" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Subtotal:&nbsp;<strong style="font-weight:700 !important">BDT ${order.totalCost}</strong><br>Shipping:&nbsp;<strong style="font-weight:700 !important">Complimentary</strong><br>Total:&nbsp;<strong style="font-weight:700 !important; font-size: 16px;">BDT ${order.totalCost}</strong></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="Margin:0;padding:20px 20px 10px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:280px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:left">
                 <tr>
                  <td align="center" class="es-m-p0r es-m-p20b" style="padding:0;Margin:0;width:280px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><p class="es-m-txt-c" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Customer: <strong style="font-weight:700 !important">${order.email}</strong></p><p class="es-m-txt-c" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Transaction ID:&nbsp;<strong style="font-weight:700 !important">${order.trxId}</strong></p><p class="es-m-txt-c" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Payment method:&nbsp;<strong style="font-weight:700 !important">${order.paymentType}</strong></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td><td style="width:0px"></td><td style="width:280px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;float:right">
                 <tr>
                  <td align="center" class="es-m-p0r" style="padding:0;Margin:0;width:280px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><p class="es-m-txt-c" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Shipping Method: <strong style="font-weight:700 !important">Standard Delivery</strong></p><p class="es-m-txt-c" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Shipping address:</p><p class="es-m-txt-c" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><strong style="font-weight:700 !important">${order.name},<br>${formattedAddress}</strong></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td></tr></table><![endif]--></td>
             </tr>
             <tr>
              <td align="left" style="Margin:0;padding:15px 20px 40px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:10px 0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Got a question?&nbsp;Email us at&nbsp;<a target="_blank" href="mailto:support@alora.com" style="mso-line-height-rule:exactly;text-decoration:underline;color:#000;font-weight: bold;font-size:14px">support@alora.com</a>.</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="es-footer" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table align="center" cellpadding="0" cellspacing="0" class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:transparent;width:600px" role="none">
             <tr>
              <td align="left" style="padding:20px 20px 40px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table cellspacing="0" width="100%" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0 0 10px;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#999999;font-size:12px">Alora&nbsp;© Alora. All Rights Reserved.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#999999;font-size:12px">Dhaka, Bangladesh</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
      </td>
     </tr>
   </table>
  </div>
 </body>
</html>`;
}
