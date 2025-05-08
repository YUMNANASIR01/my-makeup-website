
"use client";
import emailjs from "emailjs-com";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#e4add8] to-white">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-96 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/"
              alt="Contact Background"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="relative z-10 text-center space-y-4 px-4">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-5xl font-bold text-[#af0b76] mb-4"
            >
              Let&apos;s Connect
            </motion.h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mt-10">
              We&apos;re here to help and answer any questions you might have.
              Let&apos;s create something amazing together!
            </p>
          </div>
        </motion.section>

        {/* Contact Form Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Card */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white rounded-2xl shadow-xl p-8 h-fit sticky top-8"
              >
                <h2 className="text-2xl font-bold text-[#80085e] mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FFF9F2] rounded-lg">
                      <MapPin className="w-6 h-6 text-[#98075e]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Our Headquarters</h3>
                      <p className="text-gray-600">
                        236 5th SE Avenue<br />
                        New York NY10000, United States
                      </p>
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FFF9F2] rounded-lg">
                      <Phone className="w-6 h-6 text-[#80085e]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Phone Numbers</h3>
                      <p className="text-gray-600">
                        Customer Support: +(84) 123-4567<br />
                        Sales Department: +(84) 765-4321
                      </p>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FFF9F2] rounded-lg">
                      <Mail className="w-6 h-6 text-[#80085e]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email Addresses</h3>
                      <p className="text-gray-600">
                        Support: support@example.com<br />
                        Sales: sales@example.com
                      </p>
                    </div>
                  </div>
                  {/* Socials */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                      <Link href="#" className="p-2 bg-[#FFF9F2] rounded-lg hover:bg-[#c16faa] transition-colors">
                        <Instagram className="w-6 h-6 text-[#80085e] hover:text-white" />
                      </Link>
                      <Link href="#" className="p-2 bg-[#FFF9F2] rounded-lg hover:bg-[#d680be] transition-colors">
                        <Facebook className="w-6 h-6 text-[#80085e] hover:text-white" />
                      </Link>
                      <Link href="#" className="p-2 bg-[#FFF9F2] rounded-lg hover:bg-[#c570ae] transition-colors">
                        <Twitter className="w-6 h-6 text-[#80085e] hover:text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.form
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-[#80085e] mb-8">Send us a Message</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Subject</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Your Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#80085e] hover:bg-[#b1679c] transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <div className="container mx-auto px-4 pb-16">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
















// "use client";
// import emailjs from "emailjs-com";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {  MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import { Navbar } from "../components/Navbar";
// import { Footer } from "../components/Footer";
// import Link from "next/link";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: ""
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
//     const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
//     const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;

//     const templateParams = {
//       from_name: formData.name,
//       from_email: formData.email,
//       subject: formData.subject,
//       message: formData.message,
//     };

//     try {
//       await emailjs.send(serviceID, templateID, templateParams, userID);
//       toast.success("Message sent successfully!");
//       setFormData({ name: "", email: "", subject: "", message: "" });
//     } catch (error) {
//       console.error("EmailJS Error:", error);
//       toast.error("Failed to send message. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen bg-gradient-to-b from-[#e4add8] to-white">
//       {/* Hero Section */}
//       <motion.section
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative h-96 flex items-center justify-center overflow-hidden"
//       >
//         <div className="absolute inset-0 z-0">
//           <Image
//             src="/"
//             alt="Contact Background"
//             fill
//             className="object-cover opacity-20"
//             priority
//           />
//         </div>
//         <div className="relative z-10 text-center space-y-4 px-4">
//           <motion.h1
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             className="text-5xl font-bold text-[#af0b76] mb-4"
//           >
//             Let's Connect
//           </motion.h1>
//           <p className="text-xl text-gray-700 max-w-2xl mx-auto mt-10">
//             We're here to help and answer any questions you might have.
//             Let's create something amazing together!
//           </p>
//         </div>
//       </motion.section>

//       {/* Contact Form Section */}
//       <section className="py-16 md:py-24 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <div className="grid md:grid-cols-2 gap-12">
//             {/* Left Card */}
//             <motion.div
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               className="bg-white rounded-2xl shadow-xl p-8 h-fit sticky top-8"
//             >
//               <h2 className="text-2xl font-bold text-[#80085e] mb-6">Contact Information</h2>
//               <div className="space-y-6">
//                 {/* Address */}
//                 <div className="flex items-start gap-4">
//                   <div className="p-3 bg-[#FFF9F2] rounded-lg">
//                     <MapPin className="w-6 h-6 text-[#98075e]" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg mb-2">Our Headquarters</h3>
//                     <p className="text-gray-600">
//                       236 5th SE Avenue<br />
//                       New York NY10000, United States
//                     </p>
//                   </div>
//                 </div>
//                 {/* Phone */}
//                 <div className="flex items-start gap-4">
//                   <div className="p-3 bg-[#FFF9F2] rounded-lg">
//                     <Phone className="w-6 h-6 text-[#80085e]" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg mb-2">Phone Numbers</h3>
//                     <p className="text-gray-600">
//                       Customer Support: +(84) 123-4567<br />
//                       Sales Department: +(84) 765-4321
//                     </p>
//                   </div>
//                 </div>
//                 {/* Email */}
//                 <div className="flex items-start gap-4">
//                   <div className="p-3 bg-[#FFF9F2] rounded-lg">
//                     <Mail className="w-6 h-6 text-[#80085e]" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg mb-2">Email Addresses</h3>
//                     <p className="text-gray-600">
//                       Support: support@example.com<br />
//                       Sales: sales@example.com
//                     </p>
//                   </div>
//                 </div>
//                 {/* Socials */}
//                 <div className="pt-6 border-t border-gray-200">
//                   <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
//                   <div className="flex gap-4">
//                     <Link href="#" className="p-2 bg-[#FFF9F2] rounded-lg hover:bg-[#c16faa] transition-colors">
//                       <Instagram className="w-6 h-6 text-[#80085e] hover:text-white" />
//                     </Link>
//                     <Link href="#" className="p-2 bg-[#FFF9F2] rounded-lg hover:bg-[#d680be] transition-colors">
//                       <Facebook className="w-6 h-6 text-[#80085e] hover:text-white" />
//                     </Link>
//                     <Link href="#" className="p-2 bg-[#FFF9F2] rounded-lg hover:bg-[#c570ae] transition-colors">
//                       <Twitter className="w-6 h-6 text-[#80085e] hover:text-white" />
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Contact Form */}
//             <motion.form
//               initial={{ x: 50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               onSubmit={handleSubmit}
//               className="bg-white rounded-2xl shadow-xl p-8"
//             >
//               <h2 className="text-2xl font-bold text-[#80085e] mb-8">Send us a Message</h2>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-gray-700 mb-2">Full Name</label>
//                   <Input
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="John Doe"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Email Address</label>
//                   <Input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="john@example.com"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Subject</label>
//                   <Input
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="How can we help you?"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Your Message</label>
//                   <Textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Write your message here..."
//                     rows={5}
//                     required
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full h-12 bg-[#80085e] hover:bg-[#b1679c] transition-colors"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Sending..." : "Send Message"}
//                 </Button>
//               </div>
//             </motion.form>
//           </div>
//         </div>
//       </section>

//       {/* Map Section */}
//       <div className="container mx-auto px-4 pb-16">
//         <div className="rounded-2xl overflow-hidden shadow-xl">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548229184!3d40.697149419326095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1629990000000!5m2!1sen!2suk"
//             width="100%"
//             height="450"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//             className="rounded-2xl"
//           />
//         </div>
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// }
