import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Singleton instance management
let aiInstance: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getAI = (): GoogleGenAI => {
  if (!aiInstance) {
    if (!process.env.API_KEY) {
      throw new Error("API Key not found in environment variables");
    }
    aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
    throw error;
  }
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }
  
  if (!chatSession) {
    throw new Error("Chat session could not be initialized");
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "Desculpe, não consegui processar sua solicitação no momento.";
  } catch (error) {
    console.error("Error sending message:", error);
    return "Ocorreu um erro de comunicação com nosso sistema de consultoria. Por favor, tente novamente.";
  }
};
