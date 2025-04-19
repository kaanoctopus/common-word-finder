export type Stack = Array<{
    type?: string;
    children?: Array<{
        value?: string;
        type?: string;
        data?: {
            pos?: string;
        };
    }>;
}>;

export type ParsedOutput = {
    type?: string;
    children?: Array<{
        value?: string;
        type?: string;
    }>;
};

export type wordWithFreq = {
    word: string;
    frequency: number;
}
