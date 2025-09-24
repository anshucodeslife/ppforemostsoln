import { useState } from "react";
import webdev from '../assets/images/web-dev.jpeg';
import interceptor from "../interceptor";
import payment from "../assets/images/payment.jpg"
import type { IWebinarDto } from "../interfaces/Webinar";

const LiveWebinar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleRegister = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [paymentDone, setPaymentDone] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="font-sans text-gray-900">
      {/* Hero Section */}
      <section className="bg-black text-white py-14 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Join Our <span className="text-yellow-300">1-Day Live Webinar</span> on Python + AI
        </h1>
        <p className="mb-6 text-lg md:text-xl">Learn how to use Artificial Intelligence to supercharge your Python skills in just one day!</p>
        <img
          src={webdev}
          alt="Python AI Webinar"
          className="rounded-xl shadow-lg mx-auto max-w-full w-[340px] md:w-[420px]"
        />
        <div className="mt-6">
          <button onClick={handleRegister} className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition">
            Register Now – ₹99 Only
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Live AI Demo Projects", "Real-Time Code Walkthroughs", "Industry Best Practices", "E-Certificate Included"].map((item, i) => (
              <div key={i} className="bg-blue-50 p-4 rounded-lg shadow-sm text-base md:text-lg font-medium">
                ✅ {item}
              </div>
            ))}
          </div>
          <p className="text-yellow-600 text-lg font-semibold">🚀 1000+ Attendees Expected</p>
        </div>
      </section>

      {/* Instructor */}
      <section className="bg-black text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Meet Your Expert Instructor</h2>
          <div className="flex justify-center">
            {/* <InstructorCard name="Sovhan Sekhar" title="Python Developer" /> */}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Webinar Agenda – June 15, 2025</h2>
          <div className="space-y-6">
            {[
              { time: "10:00 AM", topic: "Introduction to AI & Python Applications" },
              { time: "11:00 AM", topic: "Live Coding: AI-Powered Chatbot" },
              { time: "12:00 PM", topic: "Q&A and Industry Insights" },
              { time: "12:30 PM", topic: "Free Resources + Certificate Instructions" },
            ].map(({ time, topic }, i) => (
              <div key={i} className="bg-indigo-50 p-5 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-1">{time}</h3>
                <p className="text-base md:text-lg">{topic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate */}
      <section className="bg-black text-white py-14 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Attend and Get Certified</h2>
        <p className="mb-6 text-lg">Receive a professional certificate of participation after attending the full webinar</p>
        <img
          src="https://aifortechies.in/wp-content/uploads/2024/04/certificate-sample.png"
          alt="Webinar Certificate"
          className="mx-auto max-w-full w-72 md:w-96 rounded-lg"
        />
      </section>

      {/* Call to Action */}
      <section className="bg-white text-black py-14 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Reserve Your Spot Now</h2>
        <p className="mb-6 text-lg">Limited seats available for the live webinar. Get instant access to resources and certificate.</p>
        <button onClick={handleRegister} className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition">
          Register Now – ₹99 Only
        </button>
        <div className="mt-6">
          <a
            href="https://wa.me/917086665218"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline text-lg"
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </section>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative">
            <button onClick={handleClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">✖</button>

            {!registrationSuccess ? (
              <>
                <h3 className="text-xl font-bold mb-4">Register for Webinar</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);

                  try {
                    let payload: IWebinarDto = {name: formData.name, email: formData.email,phone: formData.phone, webinarId: 1 }
                    const response = await interceptor.post('/registerwebinar', payload);

                    if (response.status !== 200) {
                      throw new Error('API request failed');
                    }
                    setRegistrationSuccess(true);
                  }
                  catch (error) {
                    const err = error as { response?: { status: number } };
                    if (err.response?.status === 409) {
                      setRegistrationSuccess(true);

                    }
                    else {
                      console.error('Error submitting form:', error);
                      alert('Something went wrong. Please try again later.');
                    }
                  }
                  finally {
                setFormData({ name: '', email: '', phone: '' });
                    setLoading(false);
                  }
                }}
                  action="https://formspree.io/f/moqgdvya"
                  method="POST"
                  className="space-y-4"
                >
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    required
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                    placeholder="Email Address"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    required
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded-md w-full font-semibold">
                    Submit & Pay ₹99
                  </button>
                </form>
              </>
            ) : !paymentDone ? (
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Payment Details</h3>
                <p className="mb-4">Thank you for registering, {formData.name}!</p>
                <p className="mb-6">Please scan the QR code below to complete your payment of ₹99</p>

                {/* Replace with your actual QR code image */}
                <div className="flex justify-center mb-6">
                  <img
                    src={payment}
                    alt="Payment QR Code"
                    className="w-48 h-48 border border-gray-200"
                  />
                </div>

                <p className="text-sm text-gray-600 mb-2">UPI ID: sovansekhar65@oksbi</p>
                <p className="text-sm text-gray-600 mb-6">Or pay to: 7086665128</p>

                <button
                  onClick={() => setPaymentDone(true)}
                  className="bg-purple-700 text-white px-4 py-2 rounded-md w-full font-semibold mb-2"
                >
                  I've Done the Payment
                </button>

                <button
                  onClick={() => {
                    setFormData({ name: '', email: '', phone: '' });
                    setRegistrationSuccess(false);
                    handleClose();
                  }}
                  className="text-purple-700 px-4 py-2 rounded-md w-full font-semibold border border-purple-700"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Payment verification is in progress!</h3>
                <p className="mb-6">Thanks for your payment! Our team will verify it and get in touch with you shortly!</p>

                <button
                  onClick={() => {
                    setFormData({ name: '', email: '', phone: '' });
                    setRegistrationSuccess(false);
                    setPaymentDone(false);
                    handleClose();
                  }}
                  className="bg-purple-700 text-white px-4 py-2 rounded-md w-full font-semibold"
                >
                  Close
                </button>
              </div>
            )}

            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Here the name,title are not generated so we comment it out but when it available be have to remove from
//For Dynamic data
// const InstructorCard = ({ name, title }) => (
//   <div className="text-center bg-white p-5 rounded-lg shadow-md w-full max-w-xs">
//     <div className="h-24 w-24 mx-auto rounded-full bg-gray-200 mb-3" />
//     <h3 className="text-lg font-bold">{name}</h3>
//     <p className="text-sm text-gray-600">{title}</p>
//   </div>
// );
//For Static Data
// const InstructorCard = () => (
//   <div className="text-center bg-white p-5 rounded-lg shadow-md w-full max-w-xs">
//     <div className="h-24 w-24 mx-auto rounded-full bg-gray-200 mb-3" />
//     <h3 className="text-lg font-bold">Sovan Sekhar</h3>
//     <p className="text-sm text-gray-600">Python Developer</p>
//   </div>
// );


export default LiveWebinar;
