import Transaction from "./transaction";

export default interface Split {
    id: string;
    url: string;
    name: string;
    date: Date;
    transactions: Transaction[]
    users: string[];
}