import nodemailer from 'nodemailer'

export const sendEmail = async (options)=>{

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL, 
      pass: process.env.SMTP_PASSWORD
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject, 
    html: options.message 
  };

  const info = await transporter.sendMail(message)

  console.log('Message sent : %s', info.messageId)
}

export const sendEmailContactMe = async (options)=>{

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL, 
      pass: process.env.SMTP_PASSWORD
    },
  });

  const message = {
    from: `${options.from} <${options.from}>`,
    to: options.email,
    subject: options.subject, 
    html: options.message 
  };

  const info = await transporter.sendMail(message)

  console.log('Message sent : %s', info.messageId)
}