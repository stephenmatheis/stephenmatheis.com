export type List = {
    question: string;
    list: string[];
};

export type ListPair = {
    id: number;
    one: List;
    two: List;
};
