import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Limit to 11 chars
    if (value.length > 11) value = value.slice(0, 11);
    
    // Apply mask (XX) XXXXX-XXXX
    if (value.length > 10) {
       value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 6) {
       // (XX) XXXX-
       value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
       // (XX) ...
       value = value.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
    } else if (value.length > 0) {
       // (XX
       value = value.replace(/^(\d*)/, "($1");
    }
    
    setPhone(value);
  };

  return (
    <section id="contact" className="bg-tokyon-black border-b border-white/10 py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
               <span className="font-mono text-xs text-tokyon-orange mb-4 block">{t.contact.label}</span>
               <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-8 leading-tight">
                  {t.contact.title_prefix} <br />
                  {t.contact.title_suffix}
               </h2>
               <p className="text-gray-400 text-lg mb-8 max-w-md">
                  {t.contact.description}
               </p>
               <div className="space-y-2">
                  <p className="text-white font-mono">HELLO@TOKYON.COM</p>
                  <p className="text-white font-mono">+55 11 99999-9999</p>
               </div>
            </div>

            <div className="bg-white/5 p-8 md:p-12 border border-white/10">
               <form className="space-y-6">
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t.contact.form_company}</label>
                     <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-tokyon-orange focus:outline-none transition-colors placeholder-white/10 rounded-none" placeholder="" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t.contact.form_email}</label>
                     <input type="email" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-tokyon-orange focus:outline-none transition-colors placeholder-white/10 rounded-none" placeholder="" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t.contact.form_whatsapp}</label>
                     <input 
                        type="tel" 
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-tokyon-orange focus:outline-none transition-colors placeholder-white/10 rounded-none" 
                        placeholder="(00) 00000-0000" 
                     />
                  </div>
                   <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t.contact.form_challenge}</label>
                     <textarea rows={3} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-tokyon-orange focus:outline-none transition-colors placeholder-white/10 rounded-none resize-none" placeholder=""></textarea>
                  </div>
                  <button type="button" className="w-full bg-white text-tokyon-black font-bold uppercase tracking-widest py-5 hover:bg-tokyon-orange hover:text-white transition-colors mt-8">
                     {t.contact.form_submit}
                  </button>
               </form>
            </div>
         </div>
      </div>
    </section>
  );
};