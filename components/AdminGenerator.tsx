
import React, { useState, useEffect } from 'react';
import { Copy, Check, LockKey, ArrowLeft, Plus, DownloadSimple } from 'phosphor-react';
import { TOKYON_SERVICES } from '../constants';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { PortfolioItem } from '../types';

export const AdminGenerator: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  // Form State
  const [form, setForm] = useState({
    slug: '',
    serviceIds: [] as string[],
    language: 'pt',
    client: '',
    project: '',
    description: '',
    imageColor: 'bg-gray-900', // Fallback color
    heroImage: '', // URL for Cover
    challenge: '',
    solution: '',
    galleryRaw: '' // Multiline string for gallery URLs
  });

  // Auto-generate slug
  useEffect(() => {
    const base = `${form.client}-${form.project}`;
    const slug = base.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setForm(prev => ({ ...prev, slug }));
  }, [form.client, form.project]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'tokyon2024') {
      setIsUnlocked(true);
    } else {
      alert('Senha incorreta');
    }
  };

  const handleServiceToggle = (id: string) => {
    setForm(prev => {
      if (prev.serviceIds.includes(id)) {
        return { ...prev, serviceIds: prev.serviceIds.filter(s => s !== id) };
      } else {
        return { ...prev, serviceIds: [...prev.serviceIds, id] };
      }
    });
  };

  // Process gallery URLs from textarea (split by newline)
  const getGalleryArray = () => {
    return form.galleryRaw.split('\n').map(url => url.trim()).filter(url => url.length > 0);
  };

  // Generate the code snippet for the preview box
  const galleryArrayStr = getGalleryArray().map(url => `'${url}'`).join(',\n      ');
  
  const generatedObjectCode = `{
    slug: '${form.slug}',
    serviceIds: [${form.serviceIds.map(id => `'${id}'`).join(', ')}],
    language: '${form.language}',
    client: '${form.client}',
    project: '${form.project}',
    description: '${form.description}',
    imageColor: '${form.imageColor}',
    heroImage: '${form.heroImage}',
    challenge: \`${form.challenge}\`,
    solution: \`${form.solution}\`,
    gallery: [
      ${galleryArrayStr}
    ]
  }`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedObjectCode + ',');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // 1. Construct the new item object
    const newItem: PortfolioItem = {
      slug: form.slug,
      serviceIds: form.serviceIds,
      client: form.client,
      project: form.project,
      description: form.description,
      imageColor: form.imageColor,
      heroImage: form.heroImage,
      challenge: form.challenge,
      solution: form.solution,
      gallery: getGalleryArray()
    };

    // 2. Merge with existing data (and add language property for local type compatibility)
    // We map over existing to preserve them, then add new. 
    // Note: We use 'any' casting briefly to handle the 'language' property which is specific to LocalPortfolioItem
    const allItems = [...PORTFOLIO_DATA, { ...newItem, language: form.language }];

    // 3. Generate the full file content as a string
    // We manually construct the string to keep it readable/editable, rather than just JSON.stringify
    const fileContent = `
import { PortfolioItem } from '../types';

export interface LocalPortfolioItem extends PortfolioItem {
  language: 'pt' | 'en';
}

// ==============================================================================
// 📢 BANCO DE DADOS DE PORTFOLIO (CMS MANUAL)
// ==============================================================================

export const PORTFOLIO_DATA: LocalPortfolioItem[] = [
${allItems.map(item => `
  {
    slug: '${item.slug}',
    serviceIds: [${item.serviceIds?.map(s => `'${s}'`).join(', ')}],
    language: '${(item as any).language}',
    client: "${item.client}",
    project: "${item.project}",
    description: "${item.description}",
    imageColor: '${item.imageColor}',
    heroImage: '${item.heroImage || ""}', 
    challenge: \`${item.challenge || ""}\`,
    solution: \`${item.solution || ""}\`,
    gallery: [${item.gallery?.map(g => `'${g}'`).join(', ')}]
  }`).join(',')}
];
`;

    // 4. Create Blob and trigger download
    const blob = new Blob([fileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-tokyon-black flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-white/5 p-8 border border-white/10 rounded-lg text-center">
          <LockKey size={48} className="text-tokyon-orange mx-auto mb-6" />
          <h2 className="text-white font-display font-bold text-2xl mb-2">Restricted Access</h2>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Access Key"
            className="w-full bg-black/50 border border-white/20 p-3 text-white text-center tracking-widest mb-4 focus:border-tokyon-orange outline-none"
          />
          <button type="submit" className="w-full bg-white text-black font-bold py-3 hover:bg-tokyon-orange hover:text-white transition-colors uppercase tracking-widest">Unlock</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tokyon-black text-white pt-20 pb-20 animate-fade-in">
       <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
             <div className="flex items-center gap-4">
                <button onClick={() => onNavigate('home')} className="p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors">
                   <ArrowLeft size={20} />
                </button>
                <h1 className="font-display font-bold text-3xl">Case Study Generator</h1>
             </div>
             <div className="flex gap-4">
                <button 
                   onClick={handleDownload}
                   className="flex items-center gap-2 bg-tokyon-orange text-white px-6 py-3 rounded font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-tokyon-black transition-colors"
                >
                   <DownloadSimple size={18} weight="bold" />
                   Download portfolio.ts
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             {/* LEFT: FORM */}
             <div className="lg:col-span-7 space-y-8">
                
                {/* Services Selector */}
                <div className="bg-white/5 p-6 rounded border border-white/10">
                   <label className="block text-xs font-mono text-tokyon-orange mb-4">LINKED SERVICES (Select multiple)</label>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {TOKYON_SERVICES.map(s => (
                         <label key={s.id} className={`flex items-center gap-2 p-3 rounded cursor-pointer transition-colors ${form.serviceIds.includes(s.id) ? 'bg-tokyon-orange/20 border border-tokyon-orange' : 'bg-black/20 border border-white/5 hover:border-white/20'}`}>
                            <input 
                              type="checkbox" 
                              checked={form.serviceIds.includes(s.id)}
                              onChange={() => handleServiceToggle(s.id)}
                              className="hidden"
                            />
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${form.serviceIds.includes(s.id) ? 'border-tokyon-orange bg-tokyon-orange' : 'border-gray-600'}`}>
                               {form.serviceIds.includes(s.id) && <Check size={12} className="text-white" />}
                            </div>
                            <span className="text-xs font-bold text-gray-300">{s.title}</span>
                         </label>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">CLIENT</label>
                      <input type="text" value={form.client} onChange={(e) => setForm({...form, client: e.target.value})} className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-tokyon-orange outline-none" placeholder="Client Name" />
                   </div>
                   <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">PROJECT</label>
                      <input type="text" value={form.project} onChange={(e) => setForm({...form, project: e.target.value})} className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-tokyon-orange outline-none" placeholder="Project Name" />
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-mono text-gray-500 mb-2">SLUG (Auto-generated)</label>
                   <input type="text" value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-gray-400 font-mono text-sm outline-none" />
                </div>

                 {/* IMAGES SECTION */}
                 <div className="bg-white/5 p-6 rounded border border-white/10 space-y-6">
                    <div>
                        <label className="block text-xs font-mono text-tokyon-orange mb-2">HERO IMAGE URL (Cover)</label>
                        <input 
                          type="text" 
                          value={form.heroImage} 
                          onChange={(e) => setForm({...form, heroImage: e.target.value})} 
                          className="w-full bg-black/20 border border-white/20 p-3 text-white focus:border-tokyon-orange outline-none" 
                          placeholder="https://mir-s3-cdn-cf.behance.net/project_modules/..." 
                        />
                        <p className="text-[10px] text-gray-500 mt-1">Tip: Right-click image on Behance {'>'} Copy Image Address</p>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-tokyon-orange mb-2">GALLERY IMAGE URLS (One per line)</label>
                        <textarea 
                          rows={6} 
                          value={form.galleryRaw} 
                          onChange={(e) => setForm({...form, galleryRaw: e.target.value})} 
                          className="w-full bg-black/20 border border-white/20 p-3 text-white focus:border-tokyon-orange outline-none text-xs font-mono" 
                          placeholder="https://behance.net/img1.jpg&#10;https://behance.net/img2.jpg&#10;https://behance.net/img3.jpg" 
                        />
                    </div>
                 </div>

                <div>
                   <label className="block text-xs font-mono text-gray-500 mb-2">SHORT DESCRIPTION</label>
                   <textarea rows={2} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-tokyon-orange outline-none" placeholder="Card summary..." />
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">CHALLENGE (Rich Text)</label>
                      <textarea rows={4} value={form.challenge} onChange={(e) => setForm({...form, challenge: e.target.value})} className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-tokyon-orange outline-none resize-none" placeholder="The problem to solve..." />
                   </div>
                   <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">SOLUTION (Rich Text)</label>
                      <textarea rows={4} value={form.solution} onChange={(e) => setForm({...form, solution: e.target.value})} className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-tokyon-orange outline-none resize-none" placeholder="How we solved it..." />
                   </div>
                </div>
             </div>

             {/* RIGHT: CODE & PREVIEW */}
             <div className="lg:col-span-5">
                <div className="sticky top-8">
                    <label className="block text-xs font-mono text-gray-500 mb-4">PREVIEW JSON</label>
                    <div className="relative">
                        <pre className="bg-black p-6 border border-white/20 rounded text-xs text-green-400 font-mono overflow-x-auto whitespace-pre-wrap h-[400px] overflow-y-auto shadow-2xl">
                           {generatedObjectCode}
                        </pre>
                        <button 
                           onClick={handleCopy}
                           className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white text-tokyon-black font-bold text-xs uppercase tracking-widest hover:bg-tokyon-orange hover:text-white transition-colors rounded"
                        >
                           {copied ? <Check size={16} /> : <Copy size={16} />}
                           {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <div className="mt-4 bg-white/5 p-4 rounded border border-white/10">
                       <p className="text-sm text-gray-300 mb-2 font-bold">How to update:</p>
                       <ol className="text-xs text-gray-400 list-decimal list-inside space-y-2">
                          <li>Fill out the form on the left.</li>
                          <li>Click <strong className="text-white">Download portfolio.ts</strong> at the top.</li>
                          <li>Replace the file in your project folder: <code>data/portfolio.ts</code></li>
                       </ol>
                    </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
