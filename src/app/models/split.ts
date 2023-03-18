import Transaction from "./transaction";

export default interface Split {
    id: string;
    url: string;
    name: string;
    date: Date;
    description: string;
    image: string;
    transactions: Transaction[]
    users: string[];
}