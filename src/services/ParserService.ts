import { Stack, wordWithFreq, ParserServiceBase } from "../types";
import { parseJapaneseText, isValidWord } from "../utils/ParserUtils";

export class ParserService implements ParserServiceBase {
    async extractWordsWithFrequency(text: string): Promise<wordWithFreq[]> {
        const parsedOutput = await parseJapaneseText(text);
        const wordFrequency = new Map<string, number>();
        const stack: Stack = [parsedOutput];

        while (stack.length > 0) {
            const node = stack.pop();
            if (!node) continue;

            const child = node.children?.[0];
            const pos = child?.data?.pos;
            const word = child?.value;

            if (isValidWord(pos, word)) {
                wordFrequency.set(word!, (wordFrequency.get(word!) || 0) + 1);
            }

            if (Array.isArray(node.children)) {
                stack.push(...node.children);
            }
        }

        return [...wordFrequency.entries()]
            .sort(([, a], [, b]) => b - a)
            .map(([word, frequency]) => ({ word, frequency }));
    }
}
