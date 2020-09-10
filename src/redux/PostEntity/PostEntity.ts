import { UserState } from "../UserEntity/types";

export interface PostEntity {
    readonly id: number,
    readonly author: UserState,
    readonly description: string,
    readonly geolocation: string,
}

export interface PostState {
    readonly postEntity: PostEntity,
    readonly postImage: string,
}
