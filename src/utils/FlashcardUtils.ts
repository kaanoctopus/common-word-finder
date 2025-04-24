export const calculateNextReview = (
    currentInterval: number,
    isCorrect: boolean
): { interval: number; nextReview: Date } => {
    const newInterval = isCorrect ? currentInterval * 2 : 1;
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInterval);
    return { interval: newInterval, nextReview };
};

export const filterNewWords = (
    words: string[],
    meanings: string[][],
    readings: string[],
    existingWordSet: Set<string>
): {
    wordsToAdd: string[];
    meaningsToAdd: string[][];
    readingsToAdd: string[];
} => {
    const wordsToAdd: string[] = [];
    const meaningsToAdd: string[][] = [];
    const readingsToAdd: string[] = [];

    for (let i = 0; i < words.length; i++) {
        if (!existingWordSet.has(words[i])) {
            wordsToAdd.push(words[i]);
            meaningsToAdd.push(meanings[i]);
            readingsToAdd.push(readings[i]);
        }
    }

    return { wordsToAdd, meaningsToAdd, readingsToAdd };
};

export const queuePromise = async (
    queueMap: Map<string, Promise<void>>,
    id: string,
    fn: () => Promise<void>
): Promise<void> => {
    const existing = queueMap.get(id) ?? Promise.resolve();
    const chained = existing
        .then(fn)
        .catch((err) => console.error(`Queue error for ${id}`, err))
        .finally(() => {
            if (queueMap.get(id) === chained) {
                queueMap.delete(id);
            }
        });

    queueMap.set(id, chained);
    return chained;
};
