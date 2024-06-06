const nodemailer = require('nodemailer');
// https://miracleio.me/snippets/use-gmail-with-nodemailer/

module.exports.sendMail = (email,subject,html) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dod550992@gmail.com',
          pass: 'smqa mjan dzxd ozqg'
        }
      });
      
      const mailOptions = { 
        from: 'dod550992@gmail.com',
        to: email,
        subject: subject,
        html: html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
      });

}