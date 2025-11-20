
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
    // PASSO 1: INTROSPECÇÃO AVANÇADA
    // Buscamos ID, Type e LABEL para fazer o match inteligente pelo nome do campo
    const introspectionQuery = `
      query GetPipeFields($pipe_id: ID!) {
        pipe(id: $pipe_id) {
          start_form_fields {
            id
            type
            label
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
    
    const fieldsAttributes: Array<{ field_id: string, field_value: string }> = [];

    if (!introJson.errors && introJson.data?.pipe?.start_form_fields) {
      const fields = introJson.data.pipe.start_form_fields;
      
      // Helper para buscar campo por palavras-chave (Case insensitive)
      const findField = (keywords: string[]) => {
        return fields.find((f: any) => 
          f.label && keywords.some(k => f.label.toLowerCase().includes(k))
        );
      };

      // 1. Mapear EMPRESA (Obrigatório segundo o erro)
      const companyField = findField(['empresa', 'company', 'nome da empresa', 'organização']);
      if (companyField) {
        fieldsAttributes.push({ field_id: companyField.id, field_value: company });
      }

      // 2. Mapear EMAIL
      const emailField = findField(['email', 'e-mail', 'correio eletrônico']);
      if (emailField) {
        fieldsAttributes.push({ field_id: emailField.id, field_value: email });
      }

      // 3. Mapear TELEFONE / WHATSAPP
      const phoneField = findField(['telefone', 'celular', 'whatsapp', 'phone', 'contato']);
      if (phoneField) {
        fieldsAttributes.push({ field_id: phoneField.id, field_value: phone });
      }

      // 4. Mapear DESCRIÇÃO / OBSERVAÇÕES / DESAFIO
      // Preferência por campos de texto longo ou com nome explícito
      const descriptionField = fields.find((f: any) => 
        (f.type === 'long_text') || 
        (f.label && ['desafio', 'obs', 'notas', 'detalhes', 'challenge', 'descrição'].some(k => f.label.toLowerCase().includes(k)))
      );

      // Montamos um texto combinado para garantir que nada se perca, mesmo se os campos acima falharem
      const combinedDescription = `
        Empresa: ${company}
        Email: ${email}
        WhatsApp: ${phone}
        
        ----------------
        DESAFIO / MENSAGEM:
        ${challenge}
      `;

      if (descriptionField) {
        // Evita duplicar se por acaso o campo de descrição for o mesmo de algum anterior (improvável, mas seguro)
        const alreadyMapped = fieldsAttributes.some(fa => fa.field_id === descriptionField.id);
        if (!alreadyMapped) {
          fieldsAttributes.push({ field_id: descriptionField.id, field_value: combinedDescription });
        }
      }
    }

    // PASSO 2: CRIAÇÃO DO CARD
    // O payload principal
    const inputPayload: any = {
      pipe_id: PIPEFY_PIPE_ID,
      title: company, // Define o título do card como o nome da empresa
      fields_attributes: fieldsAttributes
    };

    console.log("Enviando Payload para Pipefy:", JSON.stringify(inputPayload, null, 2));

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
