import fs from "fs";
import path from "path";

const assetsPath = path.join(__dirname, "../../assets/jmdict");

let dictionaryCache: Map<string, any> | null = null;

const loadDictionary = (): Map<string, any> => {
    if (dictionaryCache) return dictionaryCache;

    const dictionaryMap = new Map<string, any>();
    const files = fs.readdirSync(assetsPath);

    for (const file of files) {
        if (!file.endsWith(".json")) continue;

        const filePath = path.join(assetsPath, file);
        const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        for (const entry of fileData) {
            const [word, , type] = entry;
            if (type !== "forms") {
                dictionaryMap.set(word, entry[5]);
            }
        }
    }

    dictionaryCache = dictionaryMap;
    return dictionaryMap;
};

const dictionaryMap = loadDictionary();

const meaningCache = new Map<string, string[] | null>();

export const getMeanings = (input: string): string[] | null => {
    if (meaningCache.has(input)) {
        return meaningCache.get(input)!;
    }

    const contentEntry = dictionaryMap.get(input);
    if (!contentEntry) {
        meaningCache.set(input, null);
        return null;
    }

    const contentBlocks = contentEntry[0]?.content;
    if (!contentBlocks) {
        meaningCache.set(input, null);
        return null;
    }

    const blocks = Array.isArray(contentBlocks)
        ? contentBlocks
        : [contentBlocks];
    const definitions = blocks.flatMap((block: any) => {
        const inner = block?.content;
        const innerArray = Array.isArray(inner) ? inner : [inner];
        return innerArray
            .filter((item: any) => typeof item?.content === "string")
            .map((item: any) => item.content);
    });

    const result = definitions.length > 0 ? definitions : null;
    meaningCache.set(input, result);
    return result;
};
