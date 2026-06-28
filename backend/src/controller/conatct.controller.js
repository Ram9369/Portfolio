const transporter = require("../service/mail.service");
const messageModel = require("../model/message.model");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

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

        <h3>Message</h3>
        <p>${message}</p>
      `,
    });

    const Newmessage = await messageModel.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};
