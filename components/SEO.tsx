import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  schemaType?: 'Organization' | 'Service' | 'Article';
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://tokyon.vercel.app/og-image.png', // Imagem padrão para compartilhamento
  type = 'website',
  schemaType = 'Organization'
}) => {
  const { language } = useLanguage();
  
  const siteTitle = 'Tokyon';
  const defaultDescription = language === 'pt' 
    ? 'Agência de Branding Estratégico e Design Corporativo para empresas High-Ticket. Metodologia Orange Program para evolução de marca.' 
    : 'Strategic Branding and Corporate Design Agency for High-Ticket companies. Orange Program methodology for brand evolution.';

  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Strategic Branding & Design`;
  const finalDescription = description || defaultDescription;
  const siteUrl = 'https://tokyon.vercel.app';

  // 🚀 RICH SNIPPETS (JSON-LD)
  // Isso "explica" para o Google quem somos de forma estruturada para aparecer nos resultados ricos.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tokyon Inc.",
    "url": siteUrl,
    "logo": "https://tokyon.vercel.app/logo.png", 
    "sameAs": [
      "https://instagram.com/letstokyon",
      "https://www.linkedin.com/company/tokyon"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-98-99110-2121",
      "contactType": "customer service",
      "areaServed": ["BR", "US", "EU"],
      "availableLanguage": ["Portuguese", "English"]
    },
    "description": finalDescription
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Tokyon Strategic Branding",
    "image": image,
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": "+55-98-99110-2121",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    },
    "priceRange": "$$$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={siteUrl} />
      <meta name="author" content="Tokyon Inc." />
      <meta name="keywords" content="Branding, Design Corporativo, Estratégia de Marca, High-Ticket, Identidade Visual, Consultoria de Marca" />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Tokyon" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaType === 'Service' ? professionalServiceSchema : organizationSchema)}
      </script>
    </Helmet>
  );
};