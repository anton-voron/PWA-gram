import { Reducer } from 'redux';
import { PostState } from "./PostEntity";

const initialState: PostState = {
    postEntity: {
        id: null,
        author: null,
        description: null,
        geolocation: null
    },
    postImage: null,
};

const reduced: Reducer<PostState> = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}