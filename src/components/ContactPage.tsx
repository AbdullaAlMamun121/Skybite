import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { RestaurantSettings } from '../types';
import { getGoogleMapsUrl } from '../utils/formatters';

interface ContactPageProps {
  settings: RestaurantSettings;
  language: 'en' | 'bn';
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, language }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="py-12 md:py-20 bg-[#F7F3E9] text-[#252A27] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173F32]/10 text-[#173F32] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E98738]" />
            {language === 'bn' ? 'যোগাযোগ ও অবস্থান' : 'Get in Touch'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-[#173F32]">
            {language === 'bn' ? 'আমরা আপনার অপেক্ষায় আছি' : 'We Would Love to Hear From You'}
          </h1>
          <p className="text-sm sm:text-base text-[#252A27]/75 font-light">
            {language === 'bn'
              ? 'যেকোনো জিজ্ঞাসা, বুকিং বা ইভেন্ট সংক্রান্ত প্রয়োজনে সরাসরি আমাদের সাথে যোগাযোগ করুন।'
              : 'Whether planning a private rooftop party, dietary inquiry or corporate booking, reach out anytime.'}
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#173F32]/10 shadow-sm space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#E98738]/15 text-[#E98738] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#173F32] font-display">
              {language === 'bn' ? 'ঠিকানা' : 'Our Location'}
            </h3>
            <p className="text-xs text-[#252A27]/80 leading-relaxed">
              5 Rasta More, 1 No. R. A. Khan Road, Kushtia Sadar, Bangladesh
            </p>
            <a
              href={getGoogleMapsUrl(settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#E98738] hover:underline flex items-center gap-1 pt-1"
            >
              <span>View Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#173F32]/10 shadow-sm space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#173F32]/10 text-[#173F32] flex items-center justify-center">
              <Phone className="w-6 h-6 text-[#173F32]" />
            </div>
            <h3 className="font-bold text-base text-[#173F32] font-display">
              {language === 'bn' ? 'সরাসরি ফোন' : 'Phone Numbers'}
            </h3>
            <p className="text-xs text-[#252A27]/80">
              Reception: {settings.phone}
            </p>
            <a
              href={`tel:${settings.phone}`}
              className="text-xs font-bold text-[#173F32] hover:text-[#E98738] underline block pt-1"
            >
              Click to Call
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#173F32]/10 shadow-sm space-y-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#173F32] font-display">
              {language === 'bn' ? 'হোয়াটসঅ্যাপ চ্যাট' : 'WhatsApp Support'}
            </h3>
            <p className="text-xs text-[#252A27]/80">
              Instant order & table booking support
            </p>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-600 hover:underline block pt-1"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#173F32]/10 shadow-sm space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#E98738]/15 text-[#E98738] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#173F32] font-display">
              {language === 'bn' ? 'খোলার সময়' : 'Opening Hours'}
            </h3>
            <p className="text-xs text-[#252A27]/80">
              {settings.openingHours}
            </p>
            <span className="text-[11px] font-semibold text-emerald-600 block pt-1">
              Open 7 Days a Week
            </span>
          </div>
        </div>

        {/* Form and Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Message Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#173F32]/10 shadow-lg">
            <h3 className="text-2xl font-bold font-display text-[#173F32] mb-1">
              {language === 'bn' ? 'আমাদের বার্তা পাঠান' : 'Send Us a Message'}
            </h3>
            <p className="text-xs text-[#252A27]/70 mb-6">
              {language === 'bn'
                ? 'আপনার পরামর্শ বা যেকোনো প্রশ্ন জানাতে নিচের ফরমটি পূরণ করুন।'
                : 'Fill out the form below and we will respond promptly.'}
            </p>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-[#173F32]">Message Sent!</h4>
                <p className="text-xs text-[#252A27]/70">
                  {language === 'bn'
                    ? 'আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। ধন্যবাদ!'
                    : 'Thank you for reaching out. Our team will contact you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#173F32] uppercase mb-1">
                    {language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asif Mahmud"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F32] uppercase mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F32] uppercase mb-1">
                    {language === 'bn' ? 'বিষয়' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Birthday Party Booking, Catering"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F32] uppercase mb-1">
                    {language === 'bn' ? 'বার্তা *' : 'Your Message *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you today?..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#173F32] hover:bg-[#1f5242] text-[#F7F3E9] font-bold text-sm shadow flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4 text-[#E98738]" />
                  <span>{language === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Large Map Embed Container */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border border-[#173F32]/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg font-display text-[#173F32]">
                  Live Google Map — Kushtia 5 Rasta More
                </h3>
                <p className="text-xs text-[#252A27]/60">
                  Easy landmark access with elevator service to the rooftop
                </p>
              </div>
              <a
                href={getGoogleMapsUrl(settings)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-[#E98738] text-[#173F32] font-bold text-xs flex items-center gap-1 shadow-sm"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-gray-200">
              <iframe
                title="Google Maps Location Kushtia"
                src="https://maps.google.com/maps?q=5%20Rasta%20More,%20Kushtia,%20Bangladesh&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            <div className="bg-[#F7F3E9] p-4 rounded-xl text-xs text-[#252A27]/80 flex flex-col sm:flex-row justify-between items-center gap-2">
              <span>📍 Landmark: Right next to Kushtia 5 Rasta Circle</span>
              <span className="font-bold text-[#173F32]">Parking Facilities Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
