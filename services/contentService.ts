
import { PortfolioItem } from '../types';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { SANITY_CONFIG, urlFor } from '../lib/sanity';

// Query GROQ para buscar portfolio no Sanity
const PORTFOLIO_QUERY = `
  *[_type == "portfolioItem" && serviceId == $serviceId && language == $language]{
    client,
    project,
    description,
    "imageUrl": image.asset->url,
    imageColor
  }
`;

export const getPortfolioForService = async (serviceId: string, language: 'pt' | 'en'): Promise<PortfolioItem[]> => {
  // 1. Tentar buscar do Sanity se o Project ID estiver configurado
  if (SANITY_CONFIG.projectId !== 'seu_project_id') {
    try {
      const query = encodeURIComponent(PORTFOLIO_QUERY);
      const params = encodeURIComponent(JSON.stringify({ serviceId, language }));
      
      // Usando fetch nativo para não depender de libs externas neste ambiente
      const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v2024-03-01/data/query/${SANITY_CONFIG.dataset}?query=${query}&$serviceId="${serviceId}"&$language="${language}"`;
      
      const response = await fetch(url);
      const json = await response.json();

      if (json.result && json.result.length > 0) {
        return json.result.map((item: any) => ({
          ...item,
          // Se vier imagem do CMS, usamos ela, senão usamos a cor/gradiente fallback
          imageColor: item.imageUrl ? `url(${item.imageUrl})` : (item.imageColor || 'bg-gray-900')
        }));
      }
    } catch (error) {
      console.warn("Falha ao conectar com Sanity, usando dados locais:", error);
    }
  }

  // 2. Fallback: Usar dados locais (data/portfolio.ts)
  // Filtra os itens locais pelo ID do serviço
  const localItems = PORTFOLIO_DATA.filter(
    item => item.serviceId === serviceId && item.language === language
  );

  // Se não tiver itens específicos, retorna alguns genéricos para não ficar vazio na tela
  if (localItems.length === 0) {
    return [];
  }

  return localItems;
};
