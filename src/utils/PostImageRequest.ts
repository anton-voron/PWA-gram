export default class PostImageRequest {
    private token: string;
    private file: File;
    private description: string;
    private geolocation: string;

    constructor(token: string, file: File, description?: string, geolocation?: string) {
        this.token = token;
        this.file = file;
        this.description = description;
        this.geolocation = geolocation;
    }

    public getToken(): string {
        return this.token
    }

    public getFile(): File {
        return this.file
    }

    public getDescription(): string {
        return this.description
    }

    public getGeolocation(): string {
        return this.geolocation
    }
}