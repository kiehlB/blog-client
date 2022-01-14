import { useQuery, gql, useMutation } from '@apollo/client';

import { useRouter } from 'next/router';
import { GET_Post, Like_Post } from '../../../lib/graphql/posts';

export default function usePostLike() {
  const router = useRouter();

  const [postLike, { error }] = useMutation(Like_Post);
  const {
    loading: loadingGetPost,
    error: errorGetPos,
    data: dataGetPost,
  } = useQuery(GET_Post, {
    variables: { id: router.query.id },
  });

  const isLikeBoolean = dataGetPost?.post.liked;

  const LikehandleSubmit = async () => {
    const response = await postLike({
      variables: {
        id: router.query.id,
      },
      update: (proxy, { data: postLike }) => {
        const data = proxy.readQuery({
          query: GET_Post,
          variables: { id: router.query.id },
        });

        proxy.writeQuery({
          query: GET_Post,
          variables: { id: router.query.id },
          data: {
            ...(data as any),
            post: [postLike.likePost, data],
          },
        });
      },
    });
  };

  return { LikehandleSubmit, isLikeBoolean };
}
