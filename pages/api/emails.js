import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  console.log('beginning of sendEmail function in emails.js');
  // NOTE: Uncomment the below lines to make the code work
  const msg = {
    to: 'ashtongeorge17@gmail.com', // Change to your recipient
    from: 'ashtongeorge17@gmail.com', // Change to your verified sender
    subject: 'Incoming email from ashtonegeorge.com',
    text: 'Please reply directly.',
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
         <html lang="en">
         <head>
           <meta charset="utf-8">
  
           <title>The HTML5 Herald</title>
           <meta name="description" content="The HTML5 Herald">
           <meta name="author" content="SitePoint">
         <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  
           <link rel="stylesheet" href="css/styles.css?v=1.0">
  
         </head>
  
         <body>
           <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
                 </div>
                 <div class="container" style="margin-left: 20px;margin-right: 20px;">
                 <h3>You've got a new mail from ${req.body.fullname}, their email is: ✉️${req.body.email} </h3>
                 <div style="font-size: 16px;">
                 <p>Message:</p>
                 <p>${req.body.message}</p>
                 <br>
                 </div>
                 <img src="https:ashtonegeorge.com/favicon.ico" class="logo-image" style="height: 50px;width: 50px;border-radius: 5px;overflow: hidden;">
                 <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Ashton George<br>Software Developer<br>+1 (814) 494-5146</p>
                 <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
                   <a href="https://www.ashtonegeorge.com" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Website</a>
                   <a href="https://www.ashtonegeorge.com/blog/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Blog</a>
                   <a href="https://github.com/ashtonegeorge/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">GitHub</a>
                   <a href="https://instagram.com/ashtonegeorge/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Instagram</a>
                   <a href="https://www.linkedin.com/in/ashton-george-160619240/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">LinkedIn</a>
                   <a href="https://twitter.com/ashtonegeorge/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Twitter</a>
  
                 </div>
                 </div>
         </body>
         </html>`,
  }
  try {
    await sendgrid.send(msg)
      .then(() => {
        console.log('success!')
      });
  } catch (error) {
    console.log(error);
    console.log('previously thrown error logged in catch statement of emails.js')
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;