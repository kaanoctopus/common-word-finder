import axios from "axios";

const jishoLink = "https://jisho.org/api/v1/search/words?keyword=";

export const getMeanings = async (word: string): Promise<string[]> => {
    try {
        const response = await axios.get(`${jishoLink}${word}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.data || !response.data.data) {
            throw new Error("Invalid response format from Jisho API");
        }

        const definitions: string[] = [];
        response.data.data.forEach((entry: any) => {
            if (entry.senses) {
                entry.senses.forEach((sense: any) => {
                    if (sense.english_definitions) {
                        definitions.push(...sense.english_definitions);
                    }
                });
            }
        });

        return definitions;
    } catch (error) {
        console.error("Error fetching data from Jisho API:", error);
        throw new Error("Failed to fetch data from Jisho API");
    }
};
