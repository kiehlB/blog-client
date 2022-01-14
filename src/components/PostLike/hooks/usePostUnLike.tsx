import { useQuery, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_Post, UnLike_Post } from '../../../lib/graphql/posts';

export default function usePostUnLike() {
  const router = useRouter();

  const [UnpostLike, { error }] = useMutation(UnLike_Post);
  const {
    loading: loadingGetPost,
    error: errorGetPos,
    data: dataGetPost,
  } = useQuery(GET_Post, {
    variables: { id: router.query.id },
  });

  const isUnLikeBoolean = dataGetPost?.post.liked;

  const UnlikehandleSubmit = async () => {
    UnpostLike({
      variables: {
        id: router.query.id,
      },
      update: (proxy, { data: UnpostLike }) => {
        const data = proxy.readQuery({
          query: GET_Post,
          variables: { id: router.query.id },
        });

        proxy.writeQuery({
          query: GET_Post,
          variables: { id: router.query.id },
          data: {
            ...(data as any),
            post: [UnpostLike.unLikePost, data],
          },
        });
      },
    });
  };

  return { UnlikehandleSubmit, isUnLikeBoolean };
}
