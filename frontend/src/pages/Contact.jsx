// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Send,
//   User,
//   Mail,
//   Phone,
//   BookOpen,
//   MessageSquare,
//   ShieldAlert,
//   LogOut,
//   CheckCircle,
//   Loader2,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import API from "../services/api";

// const Contact = () => {
//   const { user, logout, loading: authLoading } = useAuth();

//   // Form State
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const [formLoading, setFormLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   // Pre-populate user name and email if logged in
//   useEffect(() => {
//     if (user) {
//       setFormData((prev) => ({
//         ...prev,
//         name: user.name || "",
//         email: user.email || "",
//       }));
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.id]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, phone, subject, message } = formData;

//     if (!name || !email || !phone || !subject || !message) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     setError("");
//     setFormLoading(true);

//     try {
//       const response = await API.post("/contact", formData);
//       if (response.data && response.data.success) {
//         setSuccess(true);
//         setFormData({
//           name: user ? user.name : "",
//           email: user ? user.email : "",
//           phone: "",
//           subject: "",
//           message: "",
//         });
//       } else {
//         setError(response.data?.message || "Failed to send message.");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "An error occurred while sending your message. Please try again.",
//       );
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   if (authLoading) {
//     return (
//       <div className="spinner-container">
//         <div className="spinner"></div>
//         <p>Loading security context...</p>
//       </div>
//     );
//   }

//   // Not Logged In - Show Premium CTA
//   if (!user) {
//     return (
//       <div className="glass-card">
//         <div className="cta-container">
//           <div className="cta-icon-wrapper">
//             <ShieldAlert size={32} />
//           </div>
//           <h2>Authentication Required</h2>
//           <p
//             style={{
//               color: "var(--text-secondary)",
//               fontSize: "0.975rem",
//               lineHeight: "1.6",
//             }}
//           >
//             To protect our systems and prevent spam, only authenticated users
//             are permitted to submit messages. Please sign in or register an
//             account to proceed.
//           </p>
//           <div className="cta-actions">
//             <Link to="/login" className="btn btn-primary">
//               Sign In
//             </Link>
//             <Link to="/register" className="btn btn-secondary">
//               Create an Account
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Logged In - Show Contact Form
//   return (
//     <div className="glass-card wide">
//       {success ? (
//         <div className="success-screen">
//           <div className="success-screen-icon">
//             <CheckCircle size={32} />
//           </div>
//           <h2>Message Sent Successfully!</h2>
//           <p
//             style={{
//               color: "var(--text-secondary)",
//               margin: "1rem 0 2rem",
//               fontSize: "0.95rem",
//             }}
//           >
//             Thank you for reaching out, {user.name}. Your message has been
//             recorded and an email notification has been dispatched to our
//             administrators. We will get back to you shortly.
//           </p>
//           <button className="btn btn-primary" onClick={() => setSuccess(false)}>
//             Send Another Message
//           </button>
//         </div>
//       ) : (
//         <>
//           <div
//             className="form-header"
//             style={{
//               textAlign: "left",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-start",
//               gap: "1rem",
//             }}
//           >
//             <div>
//               <h2>Send a Message</h2>
//               <p>
//                 Authenticated as{" "}
//                 <strong style={{ color: "hsl(var(--primary))" }}>
//                   {user.name}
//                 </strong>{" "}
//                 ({user.email})
//               </p>
//             </div>
//             <button
//               className="btn btn-danger"
//               onClick={logout}
//               style={{
//                 width: "auto",
//                 padding: "0.5rem 1rem",
//                 fontSize: "0.85rem",
//               }}
//             >
//               <LogOut size={14} />
//               Sign Out
//             </button>
//           </div>

//           {error && (
//             <div className="alert alert-error">
//               <span>{error}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="form-row">
//               <div className="form-group">
//                 <label className="form-label" htmlFor="name">
//                   Your Name
//                 </label>
//                 <div className="input-wrapper">
//                   <input
//                     className="form-input"
//                     type="text"
//                     id="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                   <User className="input-icon" size={18} />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label" htmlFor="email">
//                   Email Address
//                 </label>
//                 <div className="input-wrapper">
//                   <input
//                     className="form-input"
//                     type="email"
//                     id="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Mail className="input-icon" size={18} />
//                 </div>
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label className="form-label" htmlFor="phone">
//                   Phone Number
//                 </label>
//                 <div className="input-wrapper">
//                   <input
//                     className="form-input"
//                     type="tel"
//                     id="phone"
//                     placeholder="+1 (555) 000-0000"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Phone className="input-icon" size={18} />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label" htmlFor="subject">
//                   Subject
//                 </label>
//                 <div className="input-wrapper">
//                   <input
//                     className="form-input"
//                     type="text"
//                     id="subject"
//                     placeholder="Inquiry / Feedback"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                   />
//                   <BookOpen className="input-icon" size={18} />
//                 </div>
//               </div>
//             </div>

//             <div className="form-group">
//               <label className="form-label" htmlFor="message">
//                 Message
//               </label>
//               <div className="input-wrapper">
//                 <textarea
//                   className="form-input textarea"
//                   id="message"
//                   placeholder="Describe your inquiry in detail..."
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//                 <MessageSquare
//                   className="input-icon"
//                   size={18}
//                   style={{ top: "1rem" }}
//                 />
//               </div>
//             </div>

//             <button
//               className="btn btn-primary"
//               type="submit"
//               disabled={formLoading}
//             >
//               {formLoading ? (
//                 <>
//                   <Loader2
//                     className="spinner"
//                     style={{
//                       width: 18,
//                       height: 18,
//                       margin: 0,
//                       animation: "spin 1s linear infinite",
//                     }}
//                   />
//                   Sending Message...
//                 </>
//               ) : (
//                 <>
//                   <Send size={18} />
//                   Send Message
//                 </>
//               )}
//             </button>
//           </form>
//         </>
//       )}
//     </div>
//   );
// };

// export default Contact;
