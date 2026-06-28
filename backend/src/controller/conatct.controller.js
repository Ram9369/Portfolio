const transporter = require("../service/mail.service");
const messageModel = require("../model/message.model");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    await messageModel.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVER_EMAIL,
        subject: `New Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p>${message}</p>
        `,
      });
    } catch (mailError) {
      console.error("Mail Error:", mailError.message);
      // Don't return here.
    }

    return res.status(200).json({
      success: true,
      message: "Message saved successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
