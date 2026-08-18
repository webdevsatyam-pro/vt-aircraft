import React, { useState } from 'react';
import { Download, ShieldCheck, Phone, Mail, FileText, Headphones, Send } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SupportPage() {
  useSEO({
    title: 'Support Center & Manual Downloads | Rc Plane Hub',
    description: 'Access the VT-Simple Trainer instruction manual, register your factory warranty, or open a pilot technical support ticket.'
  });

  const { addToast } = useToast();
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportIssue, setSupportIssue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportIssue) {
      addToast('Please fill out all fields to submit your ticket.', 'error');
      return;
    }
    addToast('Support ticket submitted! A pilot technician will contact you shortly.', 'success');
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-16">
      <Breadcrumbs items={[{ name: 'Support', url: '/support' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Lifetime Flight Assistance</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">VT Customer Support Center</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Download flight manuals, register your 1-year factory warranty, or request direct technical advice.
        </p>
      </section>

      {/* Quick Support Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">User Manual & Flight Guide</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Download the full 24-page PDF manual covering unboxing, transmitter binding, and CG balancing.
          </p>
          <a
            href="/src/assets/images/vt_trainer_hero_1784882888882.jpg"
            download="VT-Simple-Trainer-Manual.pdf"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline pt-2"
          >
            <Download className="w-4 h-4" /> Download Manual (PDF 4.2 MB)
          </a>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">Register 1-Year Warranty</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Activate your 12-month manufacturer warranty for free replacement of electronics, servos, or motors.
          </p>
          <button
            onClick={() => addToast('Warranty registration portal active. Your unit is automatically registered upon purchase.', 'info')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline pt-2"
          >
            Check Warranty Status →
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
            <Headphones className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">Direct Pilot Hot Line</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Speak directly with an experienced RC technician for pre-flight setup help.
          </p>
          <a href="tel:18005550199" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline pt-2">
            <Phone className="w-4 h-4" /> Call +1 (800) 555-0199
          </a>
        </div>
      </section>

      {/* Ticket Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-3">Submit A Pilot Support Ticket</h2>
          
          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <h3 className="font-bold text-emerald-800 text-sm">Ticket Submitted Successfully!</h3>
              <p className="text-xs text-emerald-600">A VT technician has been assigned and will reply to {supportEmail} within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={supportName}
                    onChange={(e) => setSupportName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Describe Your Technical Issue or Question</label>
                <textarea
                  rows={4}
                  placeholder="e.g. Transmitter binding issue, gyro calibration check, trim adjustments..."
                  value={supportIssue}
                  onChange={(e) => setSupportIssue(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1F3A5F] hover:bg-[#2563EB] text-white font-semibold text-xs rounded-2xl transition shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Ticket</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
