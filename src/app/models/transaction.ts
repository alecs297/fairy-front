import User from "./user";

export default interface Transaction {
    id: string;
    name: string;
    description: string;
    amount: number;
    date: Date;
    payer: User;
    shares: {
        user: User;
        amount: number;
    }[];
}