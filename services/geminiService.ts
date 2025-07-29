import { type GeneratedPrompt, type GeneratePromptsOptions } from '../types';

// The Gemini SDK and API key are no longer handled on the client-side.
// This function now calls our own secure backend endpoint.

export const generatePrompts = async (options: GeneratePromptsOptions): Promise<{ prompts: GeneratedPrompt[], suggestedTags: string[] }> => {
    
    try {
        const apiResponse = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(options),
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json().catch(() => ({ error: 'An unknown API error occurred.' }));
            const message = errorData.error || `Request failed with status ${apiResponse.status}`;
            throw new Error(message);
        }

        const parsedResponse = await apiResponse.json();
        
        if (!parsedResponse.prompts || !Array.isArray(parsedResponse.prompts)) {
            throw new Error("Invalid response format from API. Expected a 'prompts' array.");
        }
        
        // The mapping logic remains the same, as the serverless function returns the same structure.
        const prompts: GeneratedPrompt[] = parsedResponse.prompts.map((p: any) => {
            if (typeof p === 'string') {
                return { description: p }; // Simple format
            }
            if (p.promptDetails && typeof p.promptDetails === 'object') {
                // New complex JSON format
                return {
                    title: p.title || 'Detailed Video Prompt',
                    description: JSON.stringify(p.promptDetails, null, 2)
                };
            }
             // Fallback for old simple JSON format
            if (p.title && p.description) {
                return { title: p.title, description: p.description };
            }
            // If it's some other object that doesn't fit, stringify it.
            if (typeof p === 'object' && p !== null) {
                return { description: JSON.stringify(p, null, 2) };
            }
            return { description: 'Invalid prompt format received.' };
        });

        const suggestedTags = parsedResponse.suggestedTags || [];

        return { prompts, suggestedTags };

    } catch (error) {
        console.error("Error calling backend service:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate prompts: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the backend service.");
    }
};
