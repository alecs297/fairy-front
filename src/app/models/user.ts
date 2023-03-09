import Badge from "./badge";

export default interface User {
    username: string;
    name: string;
    image: string;
    badges: Badge[];
}