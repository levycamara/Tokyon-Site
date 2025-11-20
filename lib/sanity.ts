
// lib/sanity.ts

// VOCÊ PRECISARÁ PREENCHER ESTES DADOS DEPOIS DE CRIAR O PROJETO NO SANITY.IO
export const SANITY_CONFIG = {
  projectId: '49sgt76v', // Atualizado com o ID fornecido
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: true, // 'true' para site rápido (cache), 'false' para dados frescos na hora
};

// Helper para montar a URL da imagem do Sanity
export const urlFor = (source: any) => {
  if (!source || !source.asset || !source.asset._ref) return null;
  const ref = source.asset._ref;
  // Exemplo de ref: image-tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg
  const [, id, dimension, format] = ref.split('-');
  return `https://cdn.sanity.io/images/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}/${id}-${dimension}.${format}`;
};