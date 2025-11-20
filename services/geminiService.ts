
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Singleton instance management
let aiInstance: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getAI = (): GoogleGenAI => {
  if (!aiInstance) {
    // Use process.env.API_KEY as per guidelines
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error("API_KEY not found. Make sure to set it in your environment variables.");
      // Fallback prevents immediate crash but chat won't work
      throw new Error("API Key not found in environment variables");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const initializeChat = async (): Promise<void> => {
  try {
    const ai = getAI();
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, 
      },
    });
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    // Don't re-throw here to avoid crashing the whole app on load if key is missing
  }
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }
  
  if (!chatSession) {
    return "O sistema de consultoria está indisponível no momento (Configuração de API pendente).";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "Desculpe, não consegui processar sua solicitação no momento.";
  } catch (error) {
    console.error("Error sending message:", error);
    return "Ocorreu um erro de comunicação com nosso sistema de consultoria. Por favor, tente novamente.";
  }
};
