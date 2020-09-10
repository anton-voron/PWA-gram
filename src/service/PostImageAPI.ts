import BaseRestAPI, { BaseRestI } from "./BaseRestAPI";
import PostImageRequest from "../utils/PostImageRequest";
import AuthRequest from "../utils/AuthRequest";
import { UserState } from "../redux/UserEntity/types";
import { base64ToBlob } from "../utils/base64ToBlob";

export interface PostImageI extends BaseRestI {
    readonly _uploadProfileURL: string;
    readonly _uploadPostURL: string;
    readonly _downloadUserProfileURL: string;
    readonly _findAllPostURL: string;
    uploadUserPostImage(request: PostImageRequest): Promise<any>;
    uploadUserProfileImage(request: PostImageRequest): Promise<any>;
    downloadUserProfileImage(request: AuthRequest): Promise<File>;
    findAllUsersPost(request: AuthRequest): Promise<File[]>;
    findAllPost(): Promise<any>;
}

export default class PostImageAIP extends BaseRestAPI implements PostImageI {
    readonly _baseUrl = `http://localhost:8000/api/v1/profile`;
    readonly _uploadProfileURL = `${this._baseUrl}/image/upload`;
    readonly _uploadPostURL = `${this._baseUrl}/post/upload`;
    readonly _downloadUserProfileURL = `${this._baseUrl}/image/download`;
    readonly _findAllPostURL = `${this._baseUrl}/posts`;

    private async postFileAPI(url: string, request: PostImageRequest): Promise<any> {
        let formData: FormData = new FormData();
        let contentLenght;

        await base64ToBlob(request.getFile())
            .then(blob => {

                const file: File = new File([blob], request.getFile().name, {
                    type: blob.type,
                });
                contentLenght = file.size;
                formData.append('file', file);
                formData.append('description', request.getDescription());
                formData.append('geolocation', request.getGeolocation());
            })
        console.log(formData.getAll('file'));

        return fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${request.getToken()}`,
                // "Content-Type": "multipart/form-data: boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW"
            },
            body: formData
        })
            .catch(error => console.log("Suka nahui blat", error))
    }

    async uploadUserPostImage(request: PostImageRequest): Promise<any> {
        await this.postFileAPI(this._uploadPostURL, request)
            .then(res => console.log("File was successfully uploaded"));
    }

    uploadUserProfileImage(request: PostImageRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }
    downloadUserProfileImage(request: AuthRequest): Promise<File> {
        throw new Error("Method not implemented.");
    }
    findAllUsersPost(request: AuthRequest): Promise<File[]> {
        throw new Error("Method not implemented.");
    }

    findAllPost(): Promise<any> {
        return this.getResource(this._findAllPostURL);
    }
}