import fs from "fs";
import path from "path";

const assetsPath = path.join(__dirname, "../../assets/jmdict");

const loadDictionary = () => {
    const files = fs.readdirSync(assetsPath);
    const mergedData: any[] = [];

    files.forEach((file) => {
        if (file.endsWith(".json")) {
            const filePath = path.join(assetsPath, file);
            const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
            mergedData.push(...fileData);
        }
    });

    return mergedData;
};

const dictionary = loadDictionary();

export const getMeanings = (input: string): string[] | null => {
    const entry = dictionary.find(
        ([word, , type]) => word === input && type !== "forms"
    );

    if (!entry) return null;

    const contentBlocks = entry[5]?.[0]?.content;
    if (!contentBlocks) return null;

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

    return definitions.length > 0 ? definitions : null;
};
