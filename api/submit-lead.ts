
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
      
      // Tipos de campos que aceitam TEXTO livre com segurança
      const safeTextTypes = ['short_text', 'long_text', 'email', 'phone', 'text'];

      // Helper atualizado: Busca por palavra-chave E verifica se o tipo é compatível com texto
      const findSafeField = (keywords: string[]) => {
        return fields.find((f: any) => 
          f.label && 
          keywords.some(k => f.label.toLowerCase().includes(k)) &&
          safeTextTypes.includes(f.type) // IMPORTANTE: Só aceita se for campo de texto
        );
      };

      // 1. Mapear EMPRESA
      // Se o campo "Empresa" for Database Connection ou Select, ele será ignorado aqui (corrigindo o erro)
      // mas o nome da empresa ainda vai no Título do Card.
      const companyField = findSafeField(['empresa', 'company', 'nome da empresa', 'organização']);
      if (companyField) {
        fieldsAttributes.push({ field_id: companyField.id, field_value: company });
      }

      // 2. Mapear EMAIL
      const emailField = findSafeField(['email', 'e-mail', 'correio eletrônico']);
      if (emailField) {
        fieldsAttributes.push({ field_id: emailField.id, field_value: email });
      }

      // 3. Mapear TELEFONE / WHATSAPP
      const phoneField = findSafeField(['telefone', 'celular', 'whatsapp', 'phone', 'contato']);
      if (phoneField) {
        fieldsAttributes.push({ field_id: phoneField.id, field_value: phone });
      }

      // 4. Mapear DESCRIÇÃO / OBSERVAÇÕES / DESAFIO (Fallback para todo o resto)
      // Aqui aceitamos qualquer campo de texto longo, independente do nome
      const descriptionField = fields.find((f: any) => 
        (f.type === 'long_text') || 
        (f.label && ['desafio', 'obs', 'notas', 'detalhes', 'challenge', 'descrição', 'sobre'].some(k => f.label.toLowerCase().includes(k)) && safeTextTypes.includes(f.type))
      );

      // Montamos um texto combinado para garantir que nada se perca
      const combinedDescription = `
        Empresa: ${company}
        Email: ${email}
        WhatsApp: ${phone}
        
        ----------------
        DESAFIO / MENSAGEM:
        ${challenge}
      `;

      if (descriptionField) {
        // Verifica se já não usamos esse ID (ex: se o campo "Empresa" era long_text)
        const alreadyMapped = fieldsAttributes.some(fa => fa.field_id === descriptionField.id);
        if (!alreadyMapped) {
          fieldsAttributes.push({ field_id: descriptionField.id, field_value: combinedDescription });
        }
      }
    }

    // PASSO 2: CRIAÇÃO DO CARD
    const inputPayload: any = {
      pipe_id: PIPEFY_PIPE_ID,
      title: company, // O nome da empresa SEMPRE vai no título, garantindo identificação
      fields_attributes: fieldsAttributes
    };

    console.log("Enviando Payload Filtrado:", JSON.stringify(inputPayload, null, 2));

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
      console.error('Pipefy Error Details:', JSON.stringify(createJson.errors));
      const msg = createJson.errors[0]?.message || "Erro desconhecido";
      
      // Se ainda der erro de campo obrigatório, avisamos para verificar a configuração do Pipe
      if (msg.includes("obrigatório") || msg.includes("required")) {
         return res.status(500).json({ 
          message: `Erro de Configuração no Pipefy: Um campo obrigatório não pôde ser preenchido automaticamente. (${msg})`,
          details: createJson.errors 
        });
      }

      return res.status(500).json({ 
        message: `Erro no Pipefy: ${msg}`,
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
