import User from "./user";

export default interface Split {
    id: string;
    url: string;
    name: string;
    date: Date;
    description: string;
    image: string;
    user: User;
}