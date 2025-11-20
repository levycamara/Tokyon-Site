
import { PortfolioItem } from '../types';
import { PORTFOLIO_DATA, LocalPortfolioItem } from '../data/portfolio';
import { SANITY_CONFIG } from '../lib/sanity';

const PORTFOLIO_QUERY = `
  *[_type == "portfolioItem" && ($serviceId in serviceIds) && language == $language]{
    slug,
    serviceIds,
    client,
    project,
    description,
    "imageUrl": image.asset->url,
    imageColor,
    challenge,
    solution,
    "gallery": gallery[].asset->url
  }
`;

export const getPortfolioForService = async (serviceId: string, language: 'pt' | 'en'): Promise<PortfolioItem[]> => {
  let sanityItems: PortfolioItem[] = [];

  if (SANITY_CONFIG.projectId) {
    try {
      // Query simplificada para demonstração, em produção real usaria o cliente oficial do Sanity
      // para lidar melhor com arrays. Aqui focamos no fallback local.
    } catch (error) {
      console.warn("CMS unavailable.");
    }
  }

  // FILTRO LOCAL ATUALIZADO:
  // Verifica se o serviceId solicitado está DENTRO do array serviceIds do item
  const localItems = PORTFOLIO_DATA.filter(item => {
    // Compatibilidade: Se serviceIds existir (novo formato), usa ele.
    if (item.serviceIds && Array.isArray(item.serviceIds)) {
      return item.serviceIds.includes(serviceId) && item.language === language;
    }
    // Fallback para formato antigo (se houver algum dado legado)
    return (item as any).serviceId === serviceId && item.language === language;
  });

  return localItems;
};

export const getProjectBySlug = async (slug: string): Promise<PortfolioItem | undefined> => {
  return PORTFOLIO_DATA.find(item => item.slug === slug);
};
