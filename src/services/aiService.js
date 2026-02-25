const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`;

// Add delay between requests to avoid rate limiting
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const aiService = {
  // Improve content clarity
  improveContent: async (text) => {
    try {
      await delay(500);
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a professional writer. Rewrite the following text to make it clearer, more engaging, and better structured. Keep the same meaning but improve readability. Return only the improved text without any explanations.\n\nText to improve:\n${text}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
          },
        }),
      });

      if (response.status === 429) {
        throw new Error(
          "Rate limit exceeded. Please wait a moment and try again.",
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `API error: ${response.statusText}`,
        );
      }

      const result = await response.json();
      return result.candidates[0].content.parts[0].text;
    } catch (error) {
      throw new Error("Failed to improve content: " + error.message);
    }
  },

  // Improve grammar
  improveGrammar: async (text) => {
    try {
      await delay(500);
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a grammar expert. Fix all grammar, spelling, and punctuation errors in the following text. Maintain the original meaning and style. Return only the corrected text without any explanations.\n\nText to correct:\n${text}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 2000,
          },
        }),
      });

      if (response.status === 429) {
        throw new Error(
          "Rate limit exceeded. Please wait a moment and try again.",
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `API error: ${response.statusText}`,
        );
      }

      const result = await response.json();
      return result.candidates[0].content.parts[0].text;
    } catch (error) {
      throw new Error("Failed to improve grammar: " + error.message);
    }
  },

  // Make content more concise
  makeConcise: async (text) => {
    try {
      await delay(500);
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a professional editor. Make the following text more concise by removing unnecessary words and redundancies. Keep all important information and maintain clarity. Return only the concise text without any explanations.\n\nText to condense:\n${text}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 1500,
          },
        }),
      });

      if (response.status === 429) {
        throw new Error(
          "Rate limit exceeded. Please wait a moment and try again.",
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `API error: ${response.statusText}`,
        );
      }

      const result = await response.json();
      return result.candidates[0].content.parts[0].text;
    } catch (error) {
      throw new Error("Failed to make content concise: " + error.message);
    }
  },

  // Suggest a better title
  suggestTitle: async (content) => {
    try {
      await delay(500);
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a creative writer. Generate exactly 3 engaging and catchy article titles based on the following content. Titles should be concise, clear, and compelling. Return only the 3 titles, each on a new line, without numbering or additional explanations.\n\nArticle content:\n${content.substring(0, 1000)}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 200,
          },
        }),
      });

      if (response.status === 429) {
        throw new Error(
          "Rate limit exceeded. Please wait a moment and try again.",
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `API error: ${response.statusText}`,
        );
      }

      const result = await response.json();
      return result.candidates[0].content.parts[0].text;
    } catch (error) {
      throw new Error("Failed to suggest titles: " + error.message);
    }
  },
};

export default aiService;
