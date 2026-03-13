import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-10 max-w-[1200px] mx-auto text-[#111]">
      <div className="text-center mb-20 animate-fade-in-up">
        <p className="font-body text-[11px] font-medium tracking-[4px] uppercase text-[#999] mb-3">Get in Touch</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wide uppercase">Contact Us</h1>
        <div className="w-10 h-[1px] bg-[#ddd] mx-auto mt-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 animate-fade-in-up delay-100">
        
        {/* Left Side: Contact Information */}
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="font-serif text-2xl font-light mb-4">Client Services</h2>
            <p className="font-body text-sm leading-relaxed text-[#777] mb-6">
              Our perfumery experts are available to assist you with any inquiries regarding our fragrance collections, your order, or bespoke gifting options.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C28D10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <div>
                  <p className="font-body text-[11px] font-medium tracking-[2px] uppercase text-[#111] mb-1">Email</p>
                  <p className="font-body text-sm text-[#777]">concierge@alorafragrances.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C28D10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div>
                  <p className="font-body text-[11px] font-medium tracking-[2px] uppercase text-[#111] mb-1">Phone</p>
                  <p className="font-body text-sm text-[#777]">+1 (800) 555-ALORA</p>
                  <p className="font-body text-xs text-[#999] mt-1">Mon - Fri, 9am - 6pm EST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#eee]">
            <h2 className="font-serif text-2xl font-light mb-4">Flagship Boutique</h2>
            <div className="flex items-start gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C28D10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <p className="font-body text-[11px] font-medium tracking-[2px] uppercase text-[#111] mb-1">New York</p>
                <p className="font-body text-sm text-[#777]">123 Luxury Lane, Suite 400</p>
                <p className="font-body text-sm text-[#777]">Beverly Hills, CA 90210</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-[#fcfcfc] border border-[#eee] p-8 md:p-10">
          <h3 className="font-serif text-xl font-light mb-6 uppercase tracking-wider text-center">Send a Message</h3>
          <form className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <label htmlFor="firstName" className="block font-body text-[10px] uppercase tracking-[1.5px] text-[#999] mb-2">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  className="w-full bg-transparent border-b border-[#ddd] pb-2 font-body text-sm text-[#111] focus:outline-none focus:border-[#C28D10] transition-colors"
                  placeholder="Jane"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block font-body text-[10px] uppercase tracking-[1.5px] text-[#999] mb-2">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  className="w-full bg-transparent border-b border-[#ddd] pb-2 font-body text-sm text-[#111] focus:outline-none focus:border-[#C28D10] transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block font-body text-[10px] uppercase tracking-[1.5px] text-[#999] mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-transparent border-b border-[#ddd] pb-2 font-body text-sm text-[#111] focus:outline-none focus:border-[#C28D10] transition-colors"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block font-body text-[10px] uppercase tracking-[1.5px] text-[#999] mb-2">Subject</label>
              <select 
                id="subject" 
                className="w-full bg-transparent border-b border-[#ddd] pb-2 font-body text-sm text-[#777] focus:outline-none focus:border-[#C28D10] transition-colors appearance-none rounded-none"
              >
                <option value="">Select an Inquiry...</option>
                <option value="order">Order Support</option>
                <option value="product">Product Information</option>
                <option value="press">Press & Media</option>
                <option value="wholesale">Wholesale</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block font-body text-[10px] uppercase tracking-[1.5px] text-[#999] mb-2">Message</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full bg-transparent border-b border-[#ddd] pb-2 font-body text-sm text-[#111] focus:outline-none focus:border-[#C28D10] transition-colors resize-none"
                placeholder="How can we help you today?"
              ></textarea>
            </div>

            <button 
              type="button" 
              className="mt-4 bg-[#111] text-white font-body text-[11px] font-medium uppercase tracking-[2px] py-4 w-full hover:bg-[#C28D10] transition-colors duration-300"
            >
              Submit Inquiry
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
