import * as React from 'react';
import PostItem from './PostItem';
import PostImageAPI from '../../service/PostImageAPI';
import { PostState } from '../../redux/PostEntity/PostEntity';
import './Posts.scss'

const Posts = () => {
    const postImageAPI: PostImageAPI = new PostImageAPI();
    const [data, setData] = React.useState(null);

    const fetchData = async () => {
        await postImageAPI.findAllPost()
            .then(res => {
                res.reverse();
                setData(res);
            });
    }
    React.useEffect(() => {
        fetchData();
    }, [])


    const renderPosts = () => {
        return data.map((post: PostState) => {
            return <PostItem {...post} key={post.postEntity.id} />
        })
    }


    return <div className="posts-wrapper">
        {data && (
            renderPosts()
        )
        }
    </div>
};

export default Posts;