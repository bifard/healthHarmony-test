import {
    IPost,
} from './types';
import {
    IParamsGetByUser,
} from './types/requests';
// import {
//     IPatchByUserBody,
// } from './types/requests';
import {
    IGetByUser,
    // IPatchByUser,
} from './types/responses';

import {
    useEffect,
    useState,
} from 'react';

import * as fetches from './fetches';

export function usePostsByUser(params?: IParamsGetByUser) {
    const [posts, setPosts] = useState<IPost[] | null>(null);

    const getPosts = async (params?: IParamsGetByUser): Promise<IGetByUser> => {
        const res = await fetches.getByUser(params);

        if (!res.posts || res.error) {
            console.log(res.error);

            return res;
        }

        setPosts(res.posts);

        return res;
    };

    useEffect(() => {
        getPosts(params);
    },
    [params]);
    // const patchPost = async (body: IPatchByUserBody): Promise<IPatchByUser> => {
    //     const res = await fetches.patchByUser(body);

    //     if (!res.post || res.error) {
    //         console.log(res.error);

    //         return res;
    //     }
    //     if (!posts) {
    //         return res;
    //     }

    //     const index = posts.findIndex((post) => post.id === body.id);
    //     const newPosts = [...posts];

    //     newPosts[index] = res.post;
    //     setPosts(newPosts);

    //     return res;
    // };

    return {
        posts,
        getPosts,
        // patchPost,
    };
}
