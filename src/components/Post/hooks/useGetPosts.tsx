import { useQuery, gql, useMutation } from '@apollo/client';
import { GET_Posts } from '../../../lib/graphql/posts';

export default function useGetPosts() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(GET_Posts, {
    notifyOnNetworkStatusChange: true,
  });

  return {
    loading,
    error,
    data,
    fetchMore,
    networkStatus,
  };
}
