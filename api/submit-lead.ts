
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

  const commonHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${PIPEFY_TOKEN}`,
  };

  try {
    // PASSO 1: INTROSPECÇÃO (Descobrir quais campos existem no Pipe)
    // Ao invés de adivinhar o ID ("description"), perguntamos ao Pipe quais campos ele tem.
    const introspectionQuery = `
      query GetPipeFields($pipe_id: ID!) {
        pipe(id: $pipe_id) {
          start_form_fields {
            id
            label
            type
          }
        }
      }
    `;

    const introspectionRes = await fetch('https://api.pipefy.com/graphql', {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify({ query: introspectionQuery, variables: { pipe_id: PIPEFY_PIPE_ID } }),
    });

    const introJson = await introspectionRes.json();

    if (introJson.errors) {
      console.error('Pipefy Introspection Error:', introJson.errors);
      return res.status(500).json({ message: 'Erro ao ler configurações do Pipefy.' });
    }

    const fields = introJson.data.pipe.start_form_fields;
    
    // Lógica Inteligente para encontrar o campo de "Detalhes/Notas"
    // 1. Procura por campos comuns de descrição
    // 2. Se não achar, pega o primeiro campo de "text" ou "long_text" que encontrar
    let targetFieldId = null;

    const descriptionField = fields.find((f: any) => 
      f.type === 'long_text' || // Preferência por texto longo (textarea)
      f.id.includes('description') || 
      f.id.includes('obs') || 
      f.id.includes('notas') ||
      f.id.includes('detalhes')
    );

    if (descriptionField) {
      targetFieldId = descriptionField.id;
    } else {
      // Fallback: Tenta qualquer campo de texto que não pareça ser nome/email
      const anyTextField = fields.find((f: any) => f.type === 'text' || f.type === 'long_text');
      if (anyTextField) targetFieldId = anyTextField.id;
    }

    // Prepara o conteúdo
    const combinedDescription = `
      Empresa: ${company}
      Email: ${email}
      WhatsApp/Tel: ${phone}
      
      Desafio:
      ${challenge}
    `;

    // PASSO 2: CRIAÇÃO DO CARD
    let mutation;
    let variables: any = {
      pipe_id: PIPEFY_PIPE_ID,
      title: company, // O título do card é sempre o nome da empresa
    };

    if (targetFieldId) {
      // Se achamos um campo de descrição, usamos ele
      mutation = `
        mutation CreateCard($pipe_id: ID!, $title: String!, $field_value: Any) {
          createCard(input: {
            pipe_id: $pipe_id,
            title: $title,
            fields_attributes: [
              { field_id: "${targetFieldId}", field_value: $field_value }
            ]
          }) {
            card { id title }
          }
        }
      `;
      variables.field_value = combinedDescription;
    } else {
      // Se NÃO achamos nenhum campo de texto no formulário, colocamos tudo no Título (Fallback de segurança)
      // Isso é feio, mas garante que o lead chega e não dá erro.
      mutation = `
        mutation CreateCard($pipe_id: ID!, $title: String!) {
          createCard(input: {
            pipe_id: $pipe_id,
            title: $title
          }) {
            card { id title }
          }
        }
      `;
      variables.title = `${company} - ${email} - ${phone}`;
    }

    const createRes = await fetch('https://api.pipefy.com/graphql', {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify({ query: mutation, variables: variables }),
    });

    const createJson = await createRes.json();

    if (createJson.errors) {
      const errorMsg = createJson.errors[0]?.message || 'Erro desconhecido';
      console.error('Pipefy Creation Error:', errorMsg);
      return res.status(500).json({ message: `Erro no Pipefy: ${errorMsg}` });
    }

    return res.status(200).json({ 
      message: 'Lead criado com sucesso', 
      id: createJson.data.createCard.card.id,
      debug_field_used: targetFieldId // Apenas para sabermos qual campo ele escolheu
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ message: 'Erro interno de conexão.' });
  }
}
