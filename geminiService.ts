
import { GoogleGenAI, Type } from "@google/genai";
import { PostIdea, HashtagSet, DMTemplate, PromotionPlan } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateContentIdeas = async (niche: string, language: string): Promise<PostIdea[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert Instagram growth strategist. Generate 5 creative and engaging post ideas for an account in the '${niche}' niche. For each idea, suggest a title, specify the post type (Reel, Carousel, Story, Static Post), and provide a brief description. Respond in ${language}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, description: "The type of post, e.g., Reel, Carousel." },
              title: { type: Type.STRING, description: "A catchy title for the post." },
              description: { type: Type.STRING, description: "A brief description of the post idea." },
            },
            required: ["type", "title", "description"],
          },
        },
      },
    });
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as PostIdea[];
  } catch (error) {
    console.error("Error generating content ideas:", error);
    throw new Error("Failed to generate content ideas. Please check your API key and try again.");
  }
};

export const generateHashtags = async (keyword: string, language: string): Promise<HashtagSet> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a set of 30 relevant hashtags for an Instagram post about '${keyword}'. Include a mix of popular, niche, and specific hashtags. Categorize them into 'broad', 'niche', and 'specific'. Respond in ${language}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            broad: { type: Type.ARRAY, items: { type: Type.STRING } },
            niche: { type: Type.ARRAY, items: { type: Type.STRING } },
            specific: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["broad", "niche", "specific"],
        },
      },
    });
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as HashtagSet;
  } catch (error) {
    console.error("Error generating hashtags:", error);
    throw new Error("Failed to generate hashtags. Please check your API key and try again.");
  }
};

export const generateDMTemplates = async (goal: string, audience: string, language: string): Promise<DMTemplate> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create a friendly and non-spammy Instagram direct message template to send to a '${audience}'. The goal of the message is '${goal}'. The message should be personalized and encourage a response. Provide a subject line for context and the body of the message. Respond in ${language}.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        subject: { type: Type.STRING, description: "A short, descriptive subject for the DM template." },
                        body: { type: Type.STRING, description: "The full body of the direct message." },
                    },
                    required: ["subject", "body"],
                },
            },
        });
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr) as DMTemplate;
    } catch (error) {
        console.error("Error generating DM templates:", error);
        throw new Error("Failed to generate DM templates. Please check your API key and try again.");
    }
};


export const generatePromotionPlan = async (postLink: string, language: string): Promise<PromotionPlan[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create a promotion plan for the Instagram post: ${postLink}. The goal is to maximize views and engagement. Suggest 3 types of accounts to share this post with via DM, and for each, provide a personalized message template. Respond in ${language}.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            accountType: { type: Type.STRING, description: "The type of account to contact, e.g., 'Influencer in your niche'." },
                            messageTemplate: { type: Type.STRING, description: "The personalized message template to send." },
                        },
                        required: ["accountType", "messageTemplate"],
                    },
                },
            },
        });
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr) as PromotionPlan[];
    } catch (error) {
        console.error("Error generating promotion plan:", error);
        throw new Error("Failed to generate promotion plan. Please check your API key and try again.");
    }
};
