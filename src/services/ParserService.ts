import { Stack, wordWithFreq, ParserServiceBase } from "../types";
import { parseJapaneseText, isValidWord } from "../utils/parserUtils";
import {AxiosError} from "axios";

export class ParserService implements ParserServiceBase {
    async extractWordsWithFrequency(text: string): Promise<wordWithFreq[]> {
        try {
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
        } catch (err: unknown) {
            const error = err as AxiosError
            throw new Error(
                `Failed to extract words with frequency: ${error?.message || "Unknown error"}`
            );
        }
    }
}
