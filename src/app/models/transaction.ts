export default interface Transaction {
    id: string;
    name: string;
    description: string;
    amount: number;
    date: Date;
    payer: string;
    shares: {
        user: string;
        amount: number;
    }[];
}