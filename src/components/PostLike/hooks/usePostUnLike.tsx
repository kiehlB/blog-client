import { useQuery, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_Posts, UnLike_Post } from '../../../lib/graphql/posts';

export default function usePostUnLike() {
    const [UnpostLike, { error }] = useMutation(UnLike_Post);
    const {
        loading: loadingGetPost,
        error: errorGetPos,
        data: dataGetPost,
    } = useQuery(GET_Posts);
    const router = useRouter();

    const isUnLikeBoolean = dataGetPost?.posts.find(el => el.id == router.query.slug).liked;

    const UnlikehandleSubmit = async () => {
        UnpostLike({
            variables: {
                id: router.query.slug,
            },
            update: (proxy, { data: UnpostLike }) => {
                const data = proxy.readQuery({
                    query: GET_Posts,
                });
                const findPost = (data as any).posts.find(el => el.id == router.query.slug);

                proxy.writeQuery({
                    query: GET_Posts,
                    data: {
                        ...(data as any),
                        posts: [UnpostLike.unLikePost, findPost],
                    },
                });
            },
        });
    };

    return { UnlikehandleSubmit, isUnLikeBoolean };
}