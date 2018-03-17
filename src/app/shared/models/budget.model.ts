export interface IBudget {
    title: string;
    amount: number;
    pending: number;
    spent: number;
};

export class Budget implements IBudget {
    title: string;
    amount: number;
    pending: number;
    spent: number;
};