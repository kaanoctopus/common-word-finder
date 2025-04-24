import fs from "fs";
import path from "path";

const assetsPath = path.join(__dirname, "../assets/jmdict");
const optimizedDictionaryPath = path.join(
    assetsPath,
    "optimized-dictionary-new.json"
);

interface OptimizedDictionary {
    [word: string]: {
        m: string[];
        r: string;
    };
}

interface DictionaryEntry extends Array<unknown> {
    0: string; // Kanji (e.g., "惚け")
    1: string; // Reading (e.g., "ぼけ")
    2: string; // Type (e.g., "1 n uk")
    5: StructuredContent[]; // Meanings content
}

interface StructuredContent {
    content: ContentNode;
}

interface ContentNode {
    content: ContentItem[] | ContentItem;
}

interface ContentItem {
    content: string; // e.g., "fool", "idiot"
}

export const createOptimizedDictionary = async (): Promise<void> => {
    const dictionaryMap: OptimizedDictionary = {};
    const files = fs.readdirSync(assetsPath);

    for (const file of files) {
        if (!file.endsWith(".json") || file === "optimized-dictionary.json") {
            continue;
        }

        const filePath = path.join(assetsPath, file);
        const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        for (const entry of fileData as DictionaryEntry[]) {
            const [word, reading, type] = entry;
            if (type === "forms") continue;

            const contentEntry = entry[5];
            const contentBlocks = contentEntry?.[0]?.content;
            if (!contentBlocks) continue;

            const blocks = Array.isArray(contentBlocks)
                ? contentBlocks
                : [contentBlocks];

            const definitions: string[] = blocks.flatMap((block) => {
                const inner = block?.content;
                const innerArray = Array.isArray(inner) ? inner : [inner];
                return innerArray
                    .filter((item) => typeof item?.content === "string")
                    .map((item) => item.content);
            });

            if (definitions.length === 0) continue;

            if (!dictionaryMap[word]) {
                dictionaryMap[word] = {
                    m: definitions.slice(0, 2),
                    r: reading,
                };
            } else {
                const existing = dictionaryMap[word].m;
                for (let i = 0; i < 2 && i < definitions.length; ++i) {
                    const def = definitions[i];
                    if (!existing.includes(def)) {
                        existing.push(def);
                    }
                }
                if (!dictionaryMap[word].r) {
                    dictionaryMap[word].r = reading;
                }
            }
        }
    }

    for (const word in dictionaryMap) {
        const reading = dictionaryMap[word].r;
        if (!reading || reading.trim() === "") {
            delete dictionaryMap[word];
        }
    }

    fs.writeFileSync(
        optimizedDictionaryPath,
        JSON.stringify(dictionaryMap),
        "utf-8"
    );
};

createOptimizedDictionary();
