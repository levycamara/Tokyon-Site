
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { company, email, phone, challenge } = req.body;

  if (!company || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const PIPEFY_TOKEN = process.env.PIPEFY_TOKEN;
  const PIPEFY_PIPE_ID = process.env.PIPEFY_PIPE_ID;

  if (!PIPEFY_TOKEN || !PIPEFY_PIPE_ID) {
    return res.status(500).json({ message: 'Configuração de servidor incompleta: Falta Token ou ID do Pipefy.' });
  }

  // Monta a descrição com HTML simples para ficar legível no card
  const combinedDescription = `
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>WhatsApp/Tel:</strong> ${phone}</p>
    <p><strong>Desafio:</strong> ${challenge}</p>
  `;

  // QUERY GRAPHQL SEGURA USANDO VARIÁVEIS
  // Isso evita erros de sintaxe se o usuário digitar aspas " ou quebras de linha
  const mutation = `
    mutation CreateCard($pipe_id: ID!, $title: String!, $description_value: Any) {
      createCard(input: {
        pipe_id: $pipe_id,
        title: $title,
        fields_attributes: [
          { field_id: "description", field_value: $description_value }
        ]
      }) {
        card {
          id
          title
        }
      }
    }
  `;

  const variables = {
    pipe_id: PIPEFY_PIPE_ID,
    title: company,
    description_value: combinedDescription
  };

  try {
    const response = await fetch('https://api.pipefy.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query: mutation, variables: variables }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error('Pipefy API Error:', JSON.stringify(json.errors, null, 2));
      
      // Tenta extrair uma mensagem amigável do erro
      const errorMsg = json.errors[0]?.message || 'Erro desconhecido no Pipefy';
      
      if (errorMsg.includes('field_id')) {
        return res.status(400).json({ 
          message: 'Erro de Campo: O campo "description" não foi encontrado no seu Pipe.',
          details: 'Vá no Pipefy > Notas sobre o negócio > Editar > API ID e mude para "description".'
        });
      }

      return res.status(500).json({ message: `Erro no Pipefy: ${errorMsg}` });
    }

    return res.status(200).json({ message: 'Lead criado com sucesso', id: json.data.createCard.card.id });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ message: 'Erro interno de conexão com Pipefy.' });
  }
}
