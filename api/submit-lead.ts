
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
    return res.status(500).json({ message: 'Server configuration error: Missing Pipefy credentials' });
  }

  // --- CONFIGURAÇÃO DOS CAMPOS DO PIPEFY ---
  // Você deve pegar os IDs dos campos no seu Pipefy (Start Form) e colocar nas variáveis de ambiente
  // ou substituir diretamente aqui se preferir.
  // Ex: Se o ID do campo email for "email_contato", use: { field_id: "email_contato", field_value: email }
  
  // Como não tenho seus IDs, vou concatenar tudo na descrição para garantir que você receba os dados
  // mesmo sem configurar os IDs específicos. O Título será a Empresa.
  
  const combinedDescription = `
    <strong>Email:</strong> ${email}<br/>
    <strong>WhatsApp/Tel:</strong> ${phone}<br/>
    <strong>Desafio:</strong> ${challenge}
  `;

  const mutation = `
    mutation {
      createCard(input: {
        pipe_id: "${PIPEFY_PIPE_ID}",
        title: "${company}",
        fields_attributes: [
          { field_id: "description", field_value: "${combinedDescription.replace(/\n/g, '')}" }
        ]
      }) {
        card {
          id
          title
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.pipefy.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query: mutation }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error('Pipefy Error:', json.errors);
      return res.status(500).json({ message: 'Error creating card in Pipefy', details: json.errors });
    }

    return res.status(200).json({ message: 'Lead created successfully', id: json.data.createCard.card.id });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
