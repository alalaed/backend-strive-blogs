import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_KEY);

export const sendEmail = async (address) => {
  const msg = {
    to: address,
    from: process.env.SENDER_EMAIL,
    subject: "THIS IS OUR FIRST EMAIL WITH SENDGRID",
    text: "bla bla bla",
    html: "<strong>bla bla bla</strong>",
  };
  await sgMail.send(msg);
};
