import { useQuery, gql, useMutation } from '@apollo/client';

import { useRouter } from 'next/router';
import { GET_Posts, Like_Post } from '../../../lib/graphql/posts';

export default function usePostLike() {
    const [postLike, { error }] = useMutation(Like_Post);
    const {
        loading: loadingGetPost,
        error: errorGetPos,
        data: dataGetPost,
    } = useQuery(GET_Posts);
    const router = useRouter();

    const isLikeBoolean = dataGetPost?.posts.find(el => el.id == router.query.slug).liked;

    const LikehandleSubmit = async () => {
        const response = await postLike({
            variables: {
                id: router.query.slug,
            },
            update: (proxy, { data: postLike }) => {
                const data = proxy.readQuery({
                    query: GET_Posts,
                });

                const findPost = (data as any).posts.find(el => el.id == router.query.slug);

                proxy.writeQuery({
                    query: GET_Posts,
                    data: {
                        ...(data as any),
                        posts: [postLike.likePost, findPost],
                    },
                });
            },
        });
    };

    return { LikehandleSubmit, isLikeBoolean };
}