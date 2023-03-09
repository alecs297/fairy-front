import Badge from "./badge";

export default interface User {
    username: string;
    name: string;
    badges: Badge[];
}