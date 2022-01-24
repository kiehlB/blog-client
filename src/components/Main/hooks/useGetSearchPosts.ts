import { useQuery, gql, useMutation } from '@apollo/client';
import { GET_Posts, GET_Search_Posts } from '../../../lib/graphql/posts';

export default function useGetSearchPosts(searchInput) {
  const { loading, error, data } = useQuery(GET_Search_Posts, {
    variables: { searchInput },
  });

  return {
    loading,
    error,
    data,
  };
}
