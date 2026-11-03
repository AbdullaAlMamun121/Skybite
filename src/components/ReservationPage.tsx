import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Phone,
  Compass,
  Info,
  Search,
  CheckCircle,
  XCircle,
  CheckCheck,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Reservation, RestaurantSettings, SeatingPreference } from '../types';
import { generateWhatsAppReservationUrl } from '../utils/formatters';

interface ReservationPageProps {
  settings: RestaurantSettings;
  language: 'en' | 'bn';
  reservations: Reservation[];
  onAddReservation: (reservation: Reservation) => void;
  activeReservationRef?: string | null;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({
  settings,
  language,
  reservations,
  onAddReservation,
  activeReservationRef,
}) => {
  const [activeTab, setActiveTab] = useState<'book' | 'track'>(activeReservationRef ? 'track' : 'book');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [date, setDate] = useState(() => {
    // Tomorrow as default
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('07:30 PM');
  const [guests, setGuests] = useState(2);
  const [seatingPreference, setSeatingPreference] = useState<SeatingPreference>('rooftop-open');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedReservationNumber, setConfirmedReservationNumber] = useState<string | null>(activeReservationRef || null);

  // Status Search State
  const [trackQuery, setTrackQuery] = useState(activeReservationRef || '');
  const [searchTriggered, setSearchTriggered] = useState(!!activeReservationRef);

  const seatingOptions: { id: SeatingPreference; labelEn: string; labelBn: string; descEn: string; descBn: string }[] = [
    {
      id: 'rooftop-open',
      labelEn: 'Rooftop Open Sky',
      labelBn: 'ওপেন স্কাই রুফটপ',
      descEn: 'Under the starry Kushtia night sky with ambient breeze',
      descBn: 'খোলা আকাশের নিচে কুষ্টিয়া শহরের মৃদু বাতাস ও রাতের আলোকছটায়'
    },
    {
      id: 'rooftop-covered',
      labelEn: 'Rooftop Glass Canopy',
      labelBn: 'কভার্ড রুফটপ কর্নার',
      descEn: 'Weather-protected elegant rooftop dining with scenic glass perimeter',
      descBn: 'বৃষ্টি বা রোদমুক্ত কাঁচঘেরা মনোরম রুফটপ ডাইনিং'
    },
    {
      id: 'family-corner',
      labelEn: 'Family & Group Booth',
      labelBn: 'পারিবারিক কেবিন / বুথ',
      descEn: 'Spacious cozy seating for privacy with family & kids',
      descBn: 'পরিবার ও বাচ্চাদের নিয়ে নিরিবিলিতে স্বাচ্ছন্দ্যে সময় কাটানোর জন্য'
    },
    {
      id: 'window-view',
      labelEn: '5 Rasta Landmark View',
      labelBn: '৫ রাস্তা মোড় ভিউ টেবিল',
      descEn: 'High vantage point overlooking Kushtia’s historic 5 Rasta More',
      descBn: 'ঐতিহাসিক ৫ রাস্তার মোড়ের ওপর থেকে দেখার প্রিমিয়াম সিটিং'
    }
  ];

  const timeSlots = [
    '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    const resNumber = `SB-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      reservationNumber: resNumber,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || undefined,
      date,
      time,
      guests,
      seatingPreference,
      specialRequests: specialRequests.trim() || undefined,
      status: 'pending',
      createdAt: new Date().toLocaleString()
    };

    onAddReservation(newReservation);
    setConfirmedReservationNumber(resNumber);
    setTrackQuery(resNumber);
    setActiveTab('track');
  };

  const getSeatingLabel = (pref: SeatingPreference) => {
    const opt = seatingOptions.find((o) => o.id === pref);
    return opt ? opt.labelEn : pref;
  };

  // Find tracked reservation from live reservations array
  const trackedReservation = reservations.find((r) => {
    const q = trackQuery.trim().toLowerCase();
    if (!q) return false;
    return r.reservationNumber.toLowerCase() === q || r.customerPhone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, ''));
  });

  return (
    <div className="py-12 md:py-20 bg-[#F7F3E9] text-[#252A27] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173F32]/10 text-[#173F32] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#E98738]" />
            {language === 'bn' ? 'টেবিল বুকিং ও স্ট্যাটাস ট্র্যাকার' : 'Rooftop Table Reservation'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-[#173F32]">
            {language === 'bn' ? 'স্কাই বাইটে আপনার আসন নিশ্চিত করুন' : 'Reserve & Track Your Table'}
          </h1>
          <p className="text-sm sm:text-base text-[#252A27]/70 font-light">
            {language === 'bn'
              ? 'অনলাইনে টেবিল বুক করুন এবং যেকোনো সময় রিয়েল-টাইমে বুকিং স্ট্যাটাস চেক করুন।'
              : 'Book a rooftop table online and track confirmation status live in our UI.'}
          </p>

          {/* Navigation Pill between Book & Track */}
          <div className="pt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab('book')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'book'
                  ? 'bg-[#173F32] text-[#F7F3E9] shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <CalendarIcon className="w-4 h-4 text-[#E98738]" />
              <span>{language === 'bn' ? 'নতুন টেবিল বুক করুন' : 'Book a New Table'}</span>
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'track'
                  ? 'bg-[#173F32] text-[#F7F3E9] shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Search className="w-4 h-4 text-[#E98738]" />
              <span>{language === 'bn' ? 'বুকিং স্ট্যাটাস চেক করুন' : 'Check Booking Status'}</span>
              {confirmedReservationNumber && (
                <span className="w-2 h-2 rounded-full bg-[#E98738] animate-ping" />
              )}
            </button>
          </div>
        </div>

        {/* TAB 1: TRACK BOOKING STATUS */}
        {activeTab === 'track' && (
          <div className="space-y-6">
            {/* Search Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#173F32]/10 space-y-4">
              <div>
                <h3 className="text-lg font-bold font-display text-[#173F32]">
                  {language === 'bn' ? 'বুকিং রেফারেন্স দিয়ে খুঁজুন' : 'Check Your Reservation Status'}
                </h3>
                <p className="text-xs text-gray-500">
                  {language === 'bn'
                    ? 'আপনার বুকিং রেফারেন্স আইডি (যেমন: SB-RES-4921) অথবা বুকিংয়ে দেওয়া মোবাইল নম্বর লিখুন।'
                    : 'Enter your Booking Reference (e.g. SB-RES-4921) or registered phone number.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={trackQuery}
                    onChange={(e) => setTrackQuery(e.target.value)}
                    placeholder="Enter Booking ID (e.g. SB-RES-4921) or Phone..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                </div>
                <button
                  onClick={() => setSearchTriggered(true)}
                  className="px-6 py-3 rounded-xl bg-[#E98738] hover:bg-[#d8782a] text-[#173F32] font-black text-sm shadow cursor-pointer transition-colors"
                >
                  {language === 'bn' ? 'স্ট্যাটাস দেখুন' : 'Check Status'}
                </button>
              </div>

              {/* Quick sample chips */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span>Recent Bookings to test:</span>
                {reservations.slice(0, 3).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setTrackQuery(r.reservationNumber);
                      setSearchTriggered(true);
                    }}
                    className="font-mono font-bold text-[#173F32] bg-[#F7F3E9] px-2.5 py-1 rounded-lg border border-[#173F32]/20 hover:bg-[#E98738]/20 transition-colors cursor-pointer"
                  >
                    {r.reservationNumber} ({r.status})
                  </button>
                ))}
              </div>
            </div>

            {/* Tracked Result Display */}
            {trackedReservation ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#173F32]/10 space-y-6 animate-fadeIn">
                {/* Live Status Header Banner */}
                {trackedReservation.status === 'confirmed' && (
                  <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-5 flex items-start gap-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-sm">
                          ✓ CONFIRMED BY RESTAURANT
                        </span>
                        {trackedReservation.statusUpdatedAt && (
                          <span className="text-[11px] text-emerald-800 font-mono">
                            Updated: {trackedReservation.statusUpdatedAt}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-extrabold text-emerald-950 font-display">
                        {language === 'bn'
                          ? 'আপনার টেবিল বুকিং নিশ্চিত করা হয়েছে!'
                          : 'Your Table Reservation is CONFIRMED!'}
                      </h4>
                      <p className="text-xs text-emerald-900 leading-relaxed">
                        {language === 'bn'
                          ? 'স্কাই বাইট রেস্টুরেন্টের পক্ষ থেকে আপনাকে স্বাগত। আপনার পছন্দের রুফটপ টেবিল প্রস্তুত রাখা হচ্ছে।'
                          : 'Sky Bite restaurant management has reviewed and confirmed your rooftop table. We look forward to hosting you at 5 Rasta More!'}
                      </p>
                    </div>
                  </div>
                )}

                {trackedReservation.status === 'completed' && (
                  <div className="bg-indigo-50 border-2 border-indigo-400 rounded-2xl p-5 flex items-start gap-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow">
                      <CheckCheck className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-600 text-white shadow-sm">
                          ★ COMPLETED
                        </span>
                        {trackedReservation.statusUpdatedAt && (
                          <span className="text-[11px] text-indigo-800 font-mono">
                            {trackedReservation.statusUpdatedAt}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-extrabold text-indigo-950 font-display">
                        {language === 'bn'
                          ? 'আপনার ভোজন পর্ব সমাপ্ত হয়েছে'
                          : 'Reservation Completed!'}
                      </h4>
                      <p className="text-xs text-indigo-900 leading-relaxed">
                        {language === 'bn'
                          ? 'স্কাই বাইটে ডাইনিং করার জন্য ধন্যবাদ। আপনার অভিজ্ঞতা আমাদের সাথে শেয়ার করতে ভুলবেন না!'
                          : 'Thank you for dining with Sky Bite Restaurant at Kushtia 5 Rasta More! We hope you loved the gourmet food and rooftop breeze.'}
                      </p>
                    </div>
                  </div>
                )}

                {(trackedReservation.status === 'cancelled' || trackedReservation.status === 'rejected') && (
                  <div className="bg-rose-50 border-2 border-rose-400 rounded-2xl p-5 flex items-start gap-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow">
                      <XCircle className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-rose-600 text-white shadow-sm">
                          ✕ CANCELLED
                        </span>
                        {trackedReservation.statusUpdatedAt && (
                          <span className="text-[11px] text-rose-800 font-mono">
                            Updated: {trackedReservation.statusUpdatedAt}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-extrabold text-rose-950 font-display">
                        {language === 'bn'
                          ? 'বুকিংটি বাতিল করা হয়েছে'
                          : 'Reservation Cancelled'}
                      </h4>
                      <p className="text-xs text-rose-900 leading-relaxed">
                        {language === 'bn'
                          ? 'এই টেবিল বুকিংটি বাতিল করা হয়েছে। কোনো সংশোধনের প্রয়োজন হলে সরাসরি আমাদের হেল্পলাইনে যোগাযোগ করুন।'
                          : 'This booking request was marked as cancelled. If this was unexpected or you wish to re-book, please contact our staff directly.'}
                      </p>
                    </div>
                  </div>
                )}

                {trackedReservation.status === 'pending' && (
                  <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-5 flex items-start gap-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow animate-pulse">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500 text-white shadow-sm">
                        ⏳ PENDING STAFF REVIEW
                      </span>
                      <h4 className="text-lg font-extrabold text-amber-950 font-display">
                        {language === 'bn'
                          ? 'ম্যানেজার রিভিউয়ের অপেক্ষায় রয়েছে'
                          : 'Awaiting Staff Confirmation'}
                      </h4>
                      <p className="text-xs text-amber-900 leading-relaxed">
                        {language === 'bn'
                          ? 'আপনার বুকিং রিকোয়েস্টটি আমাদের ম্যানেজার প্যানেলে পর্যালোচনায় রয়েছে। অনুমোদন হওয়ামাত্রই এখানে লাইভ স্ট্যাটাস আপডেট দেখতে পাবেন।'
                          : 'Your request has been received by the rooftop manager. As soon as marked Confirmed in our staff dashboard, your status will instantly reflect here.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Manager / Table Note if provided */}
                {trackedReservation.adminNotes && (
                  <div className="bg-[#173F32]/5 border border-[#173F32]/20 p-4 rounded-2xl space-y-1 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#173F32] flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-[#E98738]" />
                      Restaurant Manager Note / Table Assignment:
                    </span>
                    <p className="font-semibold text-[#173F32] text-sm">
                      {trackedReservation.adminNotes}
                    </p>
                  </div>
                )}

                {/* Reservation Details Card */}
                <div className="bg-[#F7F3E9] p-5 rounded-2xl border border-[#173F32]/10 space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between pb-2 border-b border-[#173F32]/10 font-bold text-[#173F32]">
                    <span>Booking Reference:</span>
                    <span className="text-[#E98738] font-mono text-base">{trackedReservation.reservationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Guest Name:</span>
                    <span className="font-semibold text-[#173F32]">{trackedReservation.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Contact Phone:</span>
                    <span className="font-semibold text-[#173F32]">{trackedReservation.customerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date & Time:</span>
                    <span className="font-semibold text-[#173F32]">{trackedReservation.date} at {trackedReservation.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Party Size:</span>
                    <span className="font-semibold text-[#173F32]">{trackedReservation.guests} Guest(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Seating Preference:</span>
                    <span className="font-semibold text-[#173F32] capitalize">{getSeatingLabel(trackedReservation.seatingPreference)}</span>
                  </div>
                  {trackedReservation.specialRequests && (
                    <div className="pt-2 border-t border-gray-200">
                      <span className="text-gray-500 block">Special Request:</span>
                      <span className="italic text-[#173F32] font-medium">{trackedReservation.specialRequests}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={generateWhatsAppReservationUrl(
                      trackedReservation.customerName,
                      trackedReservation.customerPhone,
                      trackedReservation.date,
                      trackedReservation.time,
                      trackedReservation.guests,
                      getSeatingLabel(trackedReservation.seatingPreference),
                      trackedReservation.specialRequests,
                      trackedReservation.reservationNumber,
                      settings.whatsapp
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${settings.phone}`}
                    className="py-3 px-5 rounded-xl bg-[#173F32] hover:bg-[#1f5242] text-[#F7F3E9] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#E98738]" />
                    <span>Call Staff</span>
                  </a>
                </div>
              </div>
            ) : searchTriggered && trackQuery.trim() ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-gray-200 space-y-3">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
                <h4 className="text-base font-bold text-gray-800">
                  No reservation found matching "{trackQuery}"
                </h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Please verify your reservation reference code (e.g. SB-RES-XXXX) or phone number, or submit a new booking request.
                </p>
                <button
                  onClick={() => setActiveTab('book')}
                  className="px-4 py-2 bg-[#173F32] text-white text-xs font-bold rounded-xl"
                >
                  Book a Table Now
                </button>
              </div>
            ) : null}
          </div>
        )}

        {/* TAB 2: BOOK A NEW TABLE */}
        {activeTab === 'book' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#173F32]/10 space-y-6">
            <div className="pb-4 border-b border-gray-100 flex items-start gap-3 text-xs text-[#252A27]/70">
              <Info className="w-5 h-5 text-[#E98738] shrink-0 mt-0.5" />
              <p>
                {language === 'bn'
                  ? 'অনলাইনে রিকোয়েস্ট পাঠানোর পর আমাদের রেস্টুরেন্ট টিম থেকে দ্রুত কনফার্ম করা হবে। টেবিল নিশ্চিত হওয়ার সাথে সাথে UI-তে নোটিফিকেশন দেখতে পাবেন।'
                  : 'Booking requests are reviewed in real-time by restaurant staff. Once approved, the UI status is updated automatically.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-1.5">
                    {language === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Shakil Ahmed"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-1.5">
                    {language === 'bn' ? 'ফোন নম্বর *' : 'Phone Number (for confirmation) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 01712-XXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-1.5">
                  {language === 'bn' ? 'ইমেইল অ্যাড্রেস (অপশনাল)' : 'Email Address (Optional)'}
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                />
              </div>

              {/* Date, Time & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-1.5">
                    {language === 'bn' ? 'তারিখ *' : 'Reservation Date *'}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-1.5">
                    {language === 'bn' ? 'সময় নির্বাচন করুন *' : 'Time Slot *'}
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32] bg-white cursor-pointer"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-1.5">
                    {language === 'bn' ? 'অতিথি সংখ্যা *' : 'Total Guests *'}
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50">
                    <Users className="w-4 h-4 text-gray-500 mr-2" />
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      className="w-full bg-transparent font-bold text-sm text-[#173F32] focus:outline-none"
                    />
                    <span className="text-xs text-gray-400">Persons</span>
                  </div>
                </div>
              </div>

              {/* Seating Preference Selector */}
              <div>
                <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-2">
                  {language === 'bn' ? 'পছন্দের সিটিং জোন *' : 'Preferred Seating Zone *'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingOptions.map((opt) => {
                    const isSelected = seatingPreference === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSeatingPreference(opt.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#173F32] text-[#F7F3E9] border-[#173F32] shadow-md'
                            : 'bg-white hover:bg-[#F7F3E9]/50 border-gray-200 text-[#252A27]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm">
                            {language === 'bn' ? opt.labelBn : opt.labelEn}
                          </span>
                          <span
                            className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-[#E98738] bg-[#E98738]' : 'border-gray-300'
                            }`}
                          />
                        </div>
                        <p className={`text-xs ${isSelected ? 'text-[#F7F3E9]/80' : 'text-gray-500'}`}>
                          {language === 'bn' ? opt.descBn : opt.descEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-1.5">
                  {language === 'bn' ? 'বিশেষ অনুরোধ (যেমন: জন্মদিন পালন, মোমবাতি আলো, অতিরিক্ত চেয়ার)' : 'Special Requests & Celebration Notes'}
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Celebrating anniversary, candle arrangement, extra kids chair, etc..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#E98738] hover:bg-[#d8782a] text-[#173F32] font-black text-base shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group hover:-translate-y-0.5"
              >
                <CalendarIcon className="w-5 h-5" />
                <span>{language === 'bn' ? 'টেবিল বুকিং সাবমিট করুন' : 'Submit Reservation Request'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
