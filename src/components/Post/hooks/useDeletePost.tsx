import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_Post, Remove_Post } from '../../../lib/graphql/posts';

export default function useDeletePost() {
  const router = useRouter();
  const [deletePost] = useMutation(Remove_Post);

  const DeletePostSubmit = async (e, findId) => {
    e.preventDefault();
    deletePost({
      variables: {
        post_id: findId,
      },
      update: proxy => {
        const data = proxy.readQuery({
          query: GET_Post,
          variables: { id: router.query.id },
        });

        proxy.writeQuery({
          query: GET_Post,
          data: {
            ...(data as any),
            post: [...(data as any).post.filter(i => i.id !== findId)],
          },
        });
      },
    });
    router.push('/');
  };

  return { DeletePostSubmit };
}
