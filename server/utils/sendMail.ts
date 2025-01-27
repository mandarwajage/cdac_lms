import nodemailer , {Transporter} from 'nodemailer'
require('dotenv').config(); 
import ejs from 'ejs';
import path from 'path';

interface EmailOptions{
  email:string;
  subject: string;
  template:string;
  data:{[keys:string]:any};
}

const sendMail = async(options:EmailOptions):Promise <void> => {
  const transporter:Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port:parseInt(process.env.SMTP_PORT || '587'),
    service: process.env.SMTP_SERVICE,
    auth:{
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

   const {email,subject,template,data} = options;

   //get the path to the email template file
   const templatepath = path.join(__dirname,'../mails',template);

   //Render email template with EJS
  const html:string = await ejs.renderFile(templatepath,data);

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html 
  };

    await transporter.sendMail(mailOptions);
};

export default sendMail;