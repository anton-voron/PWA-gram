import AuthRequest from "../utils/AuthRequest";
import PostImageRequest from "../utils/PostImageRequest";

export interface BaseRestI {
    readonly _baseUrl: string;
    getResource(url: string): Promise<any>;
}

export default class BaseRestAPI implements BaseRestI {
    readonly _baseUrl: string = `http://localhost:8000/api/v1`;

    public async getResource(url: string): Promise<any> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Could not fetch ${url}` + `, recived ${response.status}}`
            );
        } else {
            return response.json();
        }
    }
}