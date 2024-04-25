interface IForgotPassword {
    firstName: string
    lastName: string
    link: string
}

export const eventRegistrationMail = (data: IForgotPassword) => `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Profile</title>
    <link rel="stylesheet" href="/css/profile-generation.css">
  </head>
  
  <body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
    <center style="background-color:#E1E1E1;">
      <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTbl" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;">
        <tr>
          <td align="center" valign="top" id="bodyCell">
  
            <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader">
              <tr>
                <td align="center" valign="top">
  
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" valign="top">
  
                        <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer">
                          <tr>
                            <td valign="top" width="500" class="flexibleContainerCell">
  
                              <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none;display:none !important;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                                      <tr>
                                        <td align="left" class="textContent">
                                          <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;">
                                            Here you can put short introduction of your email template.
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
  
                      </td>
                    </tr>
                  </table>
  
                </td>
              </tr>
            </table>
  
            <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody">
  
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#27a810">
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                          <tr>
                            <td align="center" valign="top" width="500" class="flexibleContainerCell">
                              <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                <tr>
                                  <td align="center" valign="top" class="textContent">
                                    <div style="width:100%;display:flex;align-items:center;justify-content:center;">
                                     
                                       <img style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:30px; width:150px;font-weight:normal;margin-bottom:5px;text-align:center;" alt="nithub" src="https://firebasestorage.googleapis.com/v0/b/rapyddate.appspot.com/o/Images%2F1669315747131-Primary.svg?alt=media&token=fc83094b-d656-4207-81af-79f3142be205">
                                    </div>
                                   <br>
                                    <h2 style="text-align:center;font-weight:normal;font-family:Helvetica,Arial,sans-serif;font-size:20px;margin-bottom:10px;color:#C9BC20;line-height:135%;width:100%;margin-left:-20px;">Resend Verification</h2>
                             
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                          <tr>
                            <td align="center" valign="top" width="500" class="flexibleContainerCell">
                              <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                <tr>
                                  <td align="center" valign="top">
  
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tr>
                                        <td valign="top" class="textContent">
                                          <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">Hello  ${data.lastName} ${data.firstName} </h3>
                                          <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:100%;margin-top:1em">
                                             <p>Greetings from Nithub! </p>
                                              
                                             <p>You requested to reset your password</p>
          <br>          
                                            </div>
                                        </td>
                                      </tr>
                                    </table>
  
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
  
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8">
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                          <tr>
                            <td align="center" valign="top" width="500" class="flexibleContainerCell">
                              <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                <tr>
                                  <td align="center" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color: #27a810;border-radius:5px;">
                                      <tr>
                                        <td align="center" valign="middle" class="buttonContent" style="padding-top:10px;padding-bottom:10px;padding-right:15px;padding-left:15px;">
                                          <a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:135%;border-radius:5px;" href=${data.link} target="_blank">Go To Dashboard</a>
                                        </td>
                                      </tr>
                                    </table>
  
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
  
            </table>
  
            <!-- footer -->
            <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailFooter">
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                          <tr>
                            <td align="center" valign="top" width="500" class="flexibleContainerCell">
                              <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                <tr>
                                  <td valign="top" bgcolor="#E1E1E1">
  
                                    <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;">
                                      <div>Copyright &#169; 2022. All rights reserved.</div>
                                      <div>If you don't want to receive these emails from us in the future, please <a href="https://app.omegaconstructionmanagement.com/profile" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">unsubscribe</span></a></div>
                                    </div>
  
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <!-- // end of footer -->
  
          </td>
        </tr>
      </table>
    </center>
  </body>
  
  </html>
  `

interface EventInvitationMail {
    firstName: string
    lastName: string
    eventPhoto:string
    eventName: string
    eventDate: string
    eventTime: string
    eventLocation: string
    qrCode: string
}

export const eventRegistrationMail2 = (data: EventInvitationMail) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <style>
      @font-face {
        font-style: normal;
        font-family: Montserrat;
        font-weight: 400;
        mso-font-alt: Verdana;
        src: url(https://github.com/capptions/font-roboto/raw/master/fonts/Roboto-Bold.woff2) format(woff2);
      }

      * {
        font-family: Montserrat, Verdana;
      }
    </style>
  </head>  
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Nithub Event Invitation<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
  </div>



  <body style="background-color:#F6F6F6">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;width:612px;margin:0 auto">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td><img height="47" src="https://res.cloudinary.com/dinrq1kf4/image/upload/v1713952702/Nithub/NITPROFILE_ASSETS/NITHUB%20LOGO-2105898835.png" style="display:block;outline:none;border:none;text-decoration:none;object-fit:cover" width="132" /></td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;margin-top:2rem;width:100%;background-color:#ffffff;border-radius:16px;box-shadow:0 5px 10px rgba(20,50,70,.2)">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td><img height="290" src="${data.eventPhoto}" style="display:block;outline:none;border:none;text-decoration:none;border-radius:16px;width:100%;object-fit:cover" /></td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:0 24px 0;margin-block:3em">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody>
                                <tr>
                                  <td>
                                    <h2 style="margin:40px 0 15px;font-weight:medium;font-size:18px;line-height:21px;color:#3c3f44">Dear ${data.lastName} ${data.firstName}</h2>
                                    <p style="font-size:16px;line-height:37px;margin:16px 0;color:#3c3f44">Thank you for registering for ${data.eventName}! We are excited to have you join us and look forward to an engaging and insightful experience. Below you will find important details regarding the event:</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody>
                                <tr>
                                  <td>
                                    <h2 style="margin:40px 0 15px;font-weight:medium;font-size:18px;line-height:21px;color:#3c3f44">Event Details:</h2>
                                    <ul>
                                      <li>
                                        <p style="font-size:16px;line-height:25px;margin:16px 0;color:#3c3f44">Event Title: ${data.eventName} </p>
                                      </li>
                                      <li>
                                        <p style="font-size:16px;line-height:25px;margin:16px 0;color:#3c3f44">Date: ${data.eventDate}</p>
                                      </li>
                                      <li>
                                        <p style="font-size:16px;line-height:25px;margin:16px 0;color:#3c3f44">Time: ${data.eventTime}</p>
                                      </li>
                                      <li>
                                        <p style="font-size:16px;line-height:25px;margin:16px 0;color:#3c3f44">Location: ${data.eventLocation}.</p>
                                      </li>
                                    </ul>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="display:flex;align-items:center;gap:1em">
                              <tbody>
                                <tr>
                                  <td>
                                    <h2 style="margin:40px 0 15px;font-weight:medium;font-size:18px;line-height:21px;color:#3c3f44">Access Pass</h2>
                                    <p style="font-size:16px;line-height:37px;margin:16px 0;color:#3c3f44">Attached to this email is your QR code. Please present this code at the entrance; it will serve as your pass to access the event.</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody>
                                <tr>
                                  <td><img height="160" src="${data.qrCode}" style="display:block;outline:none;border:none;text-decoration:none;border-radius:10px" width="160" /></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background:linear-gradient(to right top, red, green);width:90%;marign:0 auto;height:4px">
                      <tbody>
                        <tr>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:680px;max-width:100%;margin:32px auto 0 auto;padding:0 30px">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;color:#706a7b">This email was sent to you regarding your registration for the nitdev event. <br />If you wish to no longer receive emails from us you can<!-- --> <span style="color:#099137;cursor:pointer">Unsubscribe</span></p>
                                </tr>
                              </tbody>
                            </table>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-block:3rem">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td align="right" data-id="__react-email-column" style="width:50%;padding-right:8px;cursor:pointer"><img src="https://res.cloudinary.com/dinrq1kf4/image/upload/v1714050577/IMAGE_7_u5vhmc.png" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                                  <td align="left" data-id="__react-email-column" style="width:50%;padding-left:8px;cursor:pointer"><img src="https://res.cloudinary.com/dinrq1kf4/image/upload/v1714050577/IMAGE_8_qaqb6n.png" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>
`
