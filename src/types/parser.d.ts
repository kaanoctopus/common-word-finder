export type Stack = Array<{
    type?: string;
    children?: Array<{
        value?: string;
        type?: string;
        children?: any[];
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
        children?: any[];
    }>;
};
