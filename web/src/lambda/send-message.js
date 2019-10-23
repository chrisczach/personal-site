require('dotenv').config({
  path: `../../.env.${process.env.NODE_ENV || 'development'}`,
});

const mailgun = require('mailgun-js')({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN,
});

export const handler = ({ body }, context, callback) => {
  const data = createMessage(body);
  mailgun.messages().send(data, (error, responseBody) => {
    console.log(responseBody);
    if (error) {
      console.log(error);
      return callback(null, {
        // return null to show no errors
        statusCode: 500, // http status code
        body: 'some error',
      });
    }
    callback(null, {
      // return null to show no errors
      statusCode: 200, // http status code
      body,
    });
  });
};

const createMessage = body => {
  const { name, email, phone, subject, message } = JSON.parse(body);

  return {
    from: `Chris Czach <contact@chrisczach.com>`,
    to: `${email.replace(/\s/g, '').toLowerCase()}, contact@chrisczach.com`,
    subject: `${subject || ''} - Thank you for your message!`,
    html: `
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width" name="viewport"/>
<!--[if !mso]><!-->
<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
<!--<![endif]-->
<title></title>
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/>
<!--<![endif]-->
<style type="text/css">
		body {
			margin: 0;
			padding: 0;
		}

		table,
		td,
		tr {
			vertical-align: top;
			border-collapse: collapse;
		}

		* {
			line-height: inherit;
		}

		a[x-apple-data-detectors=true] {
			color: inherit !important;
			text-decoration: none !important;
		}
	</style>
<style id="media-query" type="text/css">
		@media (max-width: 775px) {

			.block-grid,
			.col {
				min-width: 320px !important;
				max-width: 100% !important;
				display: block !important;
			}

			.block-grid {
				width: 100% !important;
			}

			.col {
				width: 100% !important;
			}

			.col>div {
				margin: 0 auto;
			}

			img.fullwidth,
			img.fullwidthOnMobile {
				max-width: 100% !important;
			}

			.no-stack .col {
				min-width: 0 !important;
				display: table-cell !important;
			}

			.no-stack.two-up .col {
				width: 50% !important;
			}

			.no-stack .col.num4 {
				width: 33% !important;
			}

			.no-stack .col.num8 {
				width: 66% !important;
			}

			.no-stack .col.num4 {
				width: 33% !important;
			}

			.no-stack .col.num3 {
				width: 25% !important;
			}

			.no-stack .col.num6 {
				width: 50% !important;
			}

			.no-stack .col.num9 {
				width: 75% !important;
			}

			.video-block {
				max-width: none !important;
			}

			.mobile_hide {
				min-height: 0px;
				max-height: 0px;
				max-width: 0px;
				display: none;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide {
				display: block !important;
				max-height: none !important;
			}
		}
	</style>
</head>
<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #483c51;">
<!--[if IE]><div class="ie-browser"><![endif]-->
<table bgcolor="#483c51" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #483c51; width: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td style="word-break: break-word; vertical-align: top;" valign="top">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#483c51"><![endif]-->
<div style="background-color:transparent;">
<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 755px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #1B0E1C;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#1B0E1C;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:755px"><tr class="layout-full-width" style="background-color:#1B0E1C"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="755" style="background-color:#1B0E1C;width:755px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num12" style="min-width: 320px; max-width: 755px; display: table-cell; vertical-align: top; width: 755px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 60px; padding-bottom: 30px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
<div style="color:#E5E9EA;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:60px;padding-right:30px;padding-bottom:30px;padding-left:30px;">
<div style="font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; font-size: 12px; line-height: 1.2; color: #E5E9EA; mso-line-height-alt: 14px;">
<p style="font-size: 14px; line-height: 1.2; mso-line-height-alt: 17px; margin: 0;"><strong><span style="font-size: 18px;"><span style="font-size: 18px;">Hello ${toTitleCase(
      name,
    )},</span></span></strong></p>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 10px; padding-bottom: 60px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
<div style="color:#E5E9EA;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:0px;padding-right:30px;padding-bottom:60px;padding-left:30px;">
<div style="font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; font-size: 12px; line-height: 1.2; color: #E5E9EA; mso-line-height-alt: 14px;">
<p style="font-size: 16px; line-height: 1.2; mso-line-height-alt: 19px; margin: 0;"><span style="font-size: 16px;">Thank you for your message, we'll respond to your email as soon as possible.</span></p>
<p style="font-size: 12px; line-height: 1.2; mso-line-height-alt: 14px; margin: 0;"> </p>
<p style="font-size: 16px; line-height: 1.2; mso-line-height-alt: 19px; margin: 0;"><span style="font-size: 16px;">Your original message is below.</span></p>
<p style="font-size: 12px; line-height: 1.2; mso-line-height-alt: 14px; margin: 0;"> </p>
<p style="font-size: 16px; line-height: 1.2; mso-line-height-alt: 19px; margin: 0;"><span style="font-size: 16px;">Thank you,</span></p>
<p style="font-size: 12px; line-height: 1.2; mso-line-height-alt: 14px; margin: 0;"> </p>
<p style="font-size: 16px; line-height: 1.2; mso-line-height-alt: 19px; margin: 0;"><span style="font-size: 16px;">Chris Czach</span><span style="font-size: 16px;"></span></p>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 30px; padding-right: 30px; padding-bottom: 30px; padding-left: 30px;" valign="top">
<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #8B9CA2; height: 0px; width: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 60px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
<div style="color:#E5E9EA;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:30px;padding-right:30px;padding-bottom:60px;padding-left:30px;">
<div style="font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; font-size: 12px; line-height: 1.2; color: #E5E9EA; mso-line-height-alt: 14px;">
<p style="font-size: 14px; line-height: 1.2; mso-line-height-alt: 17px; margin: 0;">From: ${toTitleCase(
      name,
    )} <${email.replace(/\s/g, '').toLowerCase()}}></p>
<p style="font-size: 14px; line-height: 1.2; mso-line-height-alt: 17px; margin: 0;">To: Chris Czach <contact@chrisczach.com></p>
<p style="font-size: 14px; line-height: 1.2; mso-line-height-alt: 17px; margin: 0;" ${
      phone ? `Phone : ${phone}` : ''
    }</p>
<p style="font-size: 14px; line-height: 1.2; mso-line-height-alt: 17px; margin: 0;">Subject:  ${subject ||
      'Chris Czach - Contact Form Submission'}</p>
<p style="font-size: 14px; line-height: 1.2; mso-line-height-alt: 17px; margin: 0;"> </p>
${message.split('\n').map(
  paragraph => `
<p style="font-size: 14px; line-height: 1.2; mso-line-height-alt: 17px; margin: 0;">${paragraph}</p>
`,
)}
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
</td>
</tr>
</tbody>
</table>
<!--[if (IE)]></div><![endif]-->
</body>
</html>
 `,
  };
};

// `
// <html>
// Hello ${toTitleCase( name ) },

// We've received your message and respond as soon as possible. Your original message is below.

// Thank you,

// Chris Czach

// ______________________________________
// Full Name:
// ${toTitleCase( name ) }

// Email:
// ${email.replace( /\s/g, '' ) }

//   ${
//   phone
//     ? `
// Phone:
// ${phone }
// `
//     : ''
//   }

// ${
//   subject
//     ? `
// Subject:
// ${subject }`
//     : ''
//   }

// Message:
// ${message }
// </html>
// `

const toTitleCase = str =>
  str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
