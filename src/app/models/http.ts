export interface HTTPResponse {
    status: number;
    message?: string;
    token?: string;
    data: any;
}