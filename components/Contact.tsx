
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle, WarningCircle, Spinner } from 'phosphor-react';

export const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Form State
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    phone: '',
    challenge: ''
  });
  
  // UI State
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
       handlePhoneChange(value);
    } else {
       setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhoneChange = (value: string) => {
    let formattedValue = value.replace(/\D/g, ''); // Remove non-digits
    
    // Limit to 11 chars
    if (formattedValue.length > 11) formattedValue = formattedValue.slice(0, 11);
    
    // Apply mask (XX) XXXXX-XXXX
    if (formattedValue.length > 10) {
       formattedValue = formattedValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (formattedValue.length > 6) {
       formattedValue = formattedValue.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (formattedValue.length > 2) {
       formattedValue = formattedValue.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
    } else if (formattedValue.length > 0) {
       formattedValue = formattedValue.replace(/^(\d*)/, "($1");
    }
    
    setFormData(prev => ({ ...prev, phone: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.email) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ company: '', email: '', phone: '', challenge: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Erro ao enviar.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Erro de conexão.');
    }
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
            </div>

            <div className="bg-white/5 p-8 md:p-12 border border-white/10 relative">
               {/* Success Overlay */}
               {status === 'success' && (
                 <div className="absolute inset-0 bg-tokyon-black/90 z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                    <CheckCircle size={64} className="text-green-500 mb-4" weight="fill" />
                    <h3 className="text-2xl text-white font-bold mb-2">Solicitação Recebida</h3>
                    <p className="text-gray-400">Entraremos em contato em breve.</p>
                    <button onClick={() => setStatus('idle')} className="mt-6 text-xs uppercase tracking-widest text-tokyon-orange hover:text-white">
                      Enviar nova mensagem
                    </button>
                 </div>
               )}

               <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t.contact.form_company} *</label>
                     <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-tokyon-orange focus:outline-none transition-colors placeholder-white/10 rounded-none" 
                     />
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t.contact.form_email} *</label>
                     <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-tokyon-orange focus:outline-none transition-colors placeholder-white/10 rounded-none" 
                     />
                  </div>
                  <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t.contact.form_whatsapp}</label>
                     <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={status === 'loading'}
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-tokyon-orange focus:outline-none transition-colors placeholder-white/10 rounded-none" 
                        placeholder="(00) 00000-0000" 
                     />
                  </div>
                   <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t.contact.form_challenge}</label>
                     <textarea 
                        rows={3} 
                        name="challenge"
                        value={formData.challenge}
                        onChange={handleInputChange}
                        disabled={status === 'loading'}
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-tokyon-orange focus:outline-none transition-colors placeholder-white/10 rounded-none resize-none" 
                     ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                       <WarningCircle size={20} />
                       <span>{errorMessage}</span>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-white text-tokyon-black font-bold uppercase tracking-widest py-5 hover:bg-tokyon-orange hover:text-white transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                     {status === 'loading' ? (
                        <>
                           <Spinner className="animate-spin" size={20} />
                           {language === 'pt' ? 'Enviando...' : 'Sending...'}
                        </>
                     ) : (
                        t.contact.form_submit
                     )}
                  </button>
               </form>
            </div>
         </div>
      </div>
    </section>
  );
};
