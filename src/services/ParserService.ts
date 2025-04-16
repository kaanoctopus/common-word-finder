import { JapaneseParser } from "nlcst-parse-japanese";
const japaneseParser = new JapaneseParser();

export class ParserService {
    parseExpression(text: string) {
        return new Promise((resolve, reject) => {
            try {
                japaneseParser.ready().then(() => {
                    const result = japaneseParser.parse(text);
                    resolve(result);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async extractWordsWithFrequency(text: string) {
        try {
            const parsedOutput = await this.parseExpression(text);
            const wordFrequency = new Map<string, number>();
            const stack: Array<{
                type?: string;
                children?: Array<{
                    value?: string;
                    type?: string;
                    children?: any[];
                }>;
            }> = [
                parsedOutput as {
                    type?: string;
                    children?: Array<{
                        value?: string;
                        type?: string;
                        children?: any[];
                    }>;
                },
            ];

            while (stack.length > 0) {
                const node = stack.pop();
                if (!node) continue;

                if (node.type === "WordNode") {
                    const word = node.children?.[0]?.value;
                    if (word && word !== "、") {
                        wordFrequency.set(
                            word,
                            (wordFrequency.get(word) || 0) + 1
                        );
                    }
                }

                if (Array.isArray(node.children)) {
                    stack.push(...node.children);
                }
            }

            return [...wordFrequency.entries()]
                .sort(([, a], [, b]) => b - a)
                .map(([word, frequency]) => ({ word, frequency }));
        } catch (err: any) {
            throw new Error(
                `Failed to extract words with frequency: ${
                    err?.message || "Unknown error"
                }`
            );
        }
    }
}
