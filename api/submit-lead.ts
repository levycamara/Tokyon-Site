
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
    // PASSO 1: INTROSPECÇÃO
    // Descobrir se existe um campo para salvar a descrição
    const introspectionQuery = `
      query GetPipeFields($pipe_id: ID!) {
        pipe(id: $pipe_id) {
          start_form_fields {
            id
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
    
    let targetFieldId = null;

    if (!introJson.errors && introJson.data?.pipe?.start_form_fields) {
      const fields = introJson.data.pipe.start_form_fields;
      
      // Tenta achar um campo que pareça descrição ou observação
      const descriptionField = fields.find((f: any) => 
        f.type === 'long_text' || 
        f.id.includes('description') || 
        f.id.includes('obs') || 
        f.id.includes('notas')
      );

      if (descriptionField) {
        targetFieldId = descriptionField.id;
      } else {
        // Fallback para qualquer campo de texto
        const anyTextField = fields.find((f: any) => f.type === 'text' || f.type === 'long_text');
        if (anyTextField) targetFieldId = anyTextField.id;
      }
    }

    // Monta a descrição com todos os dados
    const combinedDescription = `
      Empresa: ${company}
      Email: ${email}
      WhatsApp/Tel: ${phone}
      
      Desafio:
      ${challenge}
    `;

    // PASSO 2: CRIAÇÃO DO CARD USANDO INPUT OBJECT
    // Esta é a forma mais segura. Criamos o objeto payload no JS e enviamos como uma única variável.
    
    const inputPayload: any = {
      pipe_id: PIPEFY_PIPE_ID,
      title: company
    };

    if (targetFieldId) {
      inputPayload.fields_attributes = [
        { field_id: targetFieldId, field_value: combinedDescription }
      ];
    } else {
      // Fallback se não achou campo: coloca tudo no título
      inputPayload.title = `${company} - ${email} - ${phone}`;
    }

    const mutation = `
      mutation CreateCard($input: CreateCardInput!) {
        createCard(input: $input) {
          card { id title }
        }
      }
    `;

    const createRes = await fetch('https://api.pipefy.com/graphql', {
      method: 'POST',
      headers: commonHeaders,
      body: JSON.stringify({ 
        query: mutation, 
        variables: { input: inputPayload } 
      }),
    });

    const createJson = await createRes.json();

    if (createJson.errors) {
      console.error('Pipefy Error:', JSON.stringify(createJson.errors));
      return res.status(500).json({ 
        message: `Erro no Pipefy: ${createJson.errors[0]?.message}`,
        details: createJson.errors 
      });
    }

    return res.status(200).json({ 
      message: 'Lead criado com sucesso', 
      id: createJson.data.createCard.card.id 
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ message: 'Erro interno de conexão.' });
  }
}
