import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ContactPage() {
  useSEO({
    title: 'Contact Us | VT Aircraft Hangar',
    description: 'Get in touch with the VT Aircraft team for sales inquiries, dealer opportunities, and pilot support.'
  });

  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please complete all required fields.', 'error');
      return;
    }
    setIsSent(true);
    addToast('Message sent! Our team will get back to you shortly.', 'success');
  };

  return (
    <div className="space-y-12 pb-16">
      <Breadcrumbs items={[{ name: 'Contact', url: '/contact' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Reach Out To Us</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Contact VT Aircraft</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Have questions about the VT-Simple Trainer, wholesale dealer inquiries, or custom flight orders?
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Information Sidebar */}
        <div className="lg:col-span-5 bg-[#1F3A5F] text-white rounded-3xl p-8 space-y-6 shadow-xl">
          <h2 className="text-xl font-bold border-b border-slate-700 pb-4">Hangar Headquarters</h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Main Hangar Address</strong>
                <span className="text-slate-300">Aviation Parkway, Flight Hangar #4, Austin, TX 78701</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Telephone Support</strong>
                <span className="text-slate-300">+1 (800) 555-0199</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Email Address</strong>
                <span className="text-slate-300">support@vtaircraft.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Operational Hours</strong>
                <span className="text-slate-300">Monday - Friday: 8:00 AM - 6:00 PM EST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-8 shadow-xs">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Send Us A Direct Message</h2>
          
          {isSent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-900 text-sm">Message Delivered!</h3>
              <p className="text-xs text-emerald-700">Thank you for writing to VT Aircraft. We will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Order Inquiry, Technical Question"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Message *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="How can we assist your RC flight journey?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-2xl transition shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

      </section>
    </div>
  );
}
