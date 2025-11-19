export type NewUser = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
}

export enum AccountType {
    REGULAR_USER = "regularUser",
    THEATRE_OWNER = "theatreOwner"
}