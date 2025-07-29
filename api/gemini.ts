// Using URL imports to match the project's build-less setup
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@^1.11.0";

// Schemas and prompt logic are moved here to be self-contained in the serverless function.
const detailedPromptSchema = {
    type: Type.OBJECT,
    description: "A detailed breakdown of the video prompt in a structured JSON format.",
    properties: {
        shot: {
            type: Type.OBJECT,
            properties: {
                composition: { type: Type.STRING, description: "e.g., Mid-shot, gradually zooming in" },
                camera_motion: { type: Type.STRING, description: "e.g., Slow, gentle zoom" },
                frame_rate: { type: Type.STRING, description: "e.g., 24fps" },
                film_grain: { type: Type.STRING, description: "e.g., Soft, slightly textured" }
            }
        },
        subject: {
            type: Type.OBJECT,
            properties: {
                description: { type: Type.STRING, description: "Description of the main characters or subjects." },
                wardrobe: { 
                    type: Type.ARRAY,
                    description: "List of clothing or accessories for the subjects.",
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            character: { type: Type.STRING, description: "The character or subject wearing the item." },
                            item: { type: Type.STRING, description: "The description of the clothing or accessory." },
                        },
                        required: ['character', 'item']
                    }
                }
            }
        },
        scene: {
            type: Type.OBJECT,
            properties: {
                location: { type: Type.STRING, description: "The setting of the scene." },
                time_of_day: { type: Type.STRING, description: "e.g., Soft, golden afternoon light" },
                environment: { type: Type.STRING, description: "Details about the immediate surroundings." }
            }
        },
        visual_details: {
            type: Type.OBJECT,
            properties: {
                action: { type: Type.STRING, description: "The primary action taking place." },
                props: { type: Type.STRING, description: "Key props in the scene." }
            }
        },
        cinematography: {
            type: Type.OBJECT,
            properties: {
                lighting: { type: Type.STRING, description: "The lighting style." },
                tone: { type: Type.STRING, description: "The overall mood or tone." }
            }
        },
        audio: {
            type: Type.OBJECT,
            properties: {
                ambient: { type: Type.STRING, description: "Background sounds or music." },
                character_sounds: { 
                    type: Type.ARRAY, 
                    description: "A list of sound effects or non-verbal sounds for characters.",
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            character: { type: Type.STRING, description: "The character making the sound." },
                            sound: { type: Type.STRING, description: "The description of the sound." },
                        },
                        required: ['character', 'sound']
                    }
                }
            }
        },
        color_palette: { type: Type.STRING, description: "The main colors used in the scene." },
        dialogue: {
            type: Type.OBJECT,
            description: "A specific line of dialogue to be highlighted.",
            properties: {
                character: { type: Type.STRING },
                line: { type: Type.STRING },
                subtitles: { type: Type.BOOLEAN }
            },
        }
    }
};

const getDynamicSchema = (format, charLimit, numPrompts, logoName) => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            prompts: {
                type: Type.ARRAY,
                description: `An array of ${numPrompts} unique video prompts.`,
                items: {}
            },
            suggestedTags: {
                type: Type.ARRAY,
                description: "An array of 5-7 suggested tags relevant to the inspiration prompt.",
                items: {
                    type: Type.STRING
                }
            }
        },
        required: ["prompts", "suggestedTags"]
    };

    if (format === 'json') {
        schema.properties.prompts.items = {
            type: Type.OBJECT,
            properties: {
                title: {
                    type: Type.STRING,
                    description: "A short, catchy title for the prompt."
                },
                promptDetails: detailedPromptSchema
            },
            required: ["title", "promptDetails"]
        };
    } else { // 'simple' format
         schema.properties.prompts.items = {
            type: Type.STRING,
            description: `A full video prompt description, under ${charLimit} characters, including the '${logoName}'.`
        };
    }
    return schema;
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    if (!process.env.API_KEY) {
        console.error("API_KEY environment variable is not set on the server.");
        return res.status(500).json({ error: 'Server configuration error: API key not found.' });
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const { inspiration, charLimit, format, numPrompts, logoName } = req.body;

        if (!inspiration || !logoName || !charLimit || !format || !numPrompts) {
            return res.status(400).json({ error: 'Missing required prompt generation parameters.' });
        }
        
        const dynamicPrompt = `
Based on the following inspiration prompt, generate ${numPrompts} new, unique video prompts. Also, provide a list of 5-7 relevant tags based on the inspiration prompt.

**Inspiration Prompt:**
"${inspiration}"

**Instructions for new prompts:**
1. Maintain a whimsical, gentle, and detailed stop-motion style.
2. Each prompt must be under ${charLimit} characters (for simple format) or provide extensive detail (for JSON format).
3. Crucially, each prompt must creatively incorporate the '${logoName}' logo onto different objects or characters within the scene. For example, on a character's clothing, a picnic blanket, a storefront sign, a package, a book cover, a wall poster, etc.
4. In addition to the creative integration, every prompt must also include a directive for a watermark of the '${logoName}' logo to be displayed in the top-right corner of the video frame. This instruction should be part of the prompt description or details.

**Output Format Instructions:**
${format === 'json' 
    ? `5. For each prompt, provide a catchy 'title' and a 'promptDetails' object. The 'promptDetails' object must follow the detailed JSON structure provided in the schema, breaking down the prompt into categories like shot, subject, scene, etc. Ensure the '${logoName}' is included in the details.` 
    : '5. Provide only the prompt description as a single string, without a title.'
}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: dynamicPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: getDynamicSchema(format, charLimit, numPrompts, logoName),
                temperature: 0.8,
            },
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        return res.status(200).json(parsedResponse);

    } catch (error) {
        console.error("Error in Gemini API call from serverless function:", error);
        return res.status(500).json({ error: 'An unexpected error occurred while generating prompts.' });
    }
}
