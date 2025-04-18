export const calculateNextReview = (
    currentInterval: number,
    isCorrect: boolean
): { interval: number; nextReview: Date } => {
    let newInterval = isCorrect ? currentInterval * 2 : 1;
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInterval);
    return { interval: newInterval, nextReview };
};
