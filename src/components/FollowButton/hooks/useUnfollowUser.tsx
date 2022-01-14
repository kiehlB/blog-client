import { useQuery, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_Post } from '../../../lib/graphql/posts';
import { getUsersQuery, meQuery, unFollowMutation } from '../../../lib/graphql/users';

export default function useUnfollowUser() {
  const { asPath, pathname } = useRouter();

  const asId = asPath;
  const postUserId = asId.split('/')[2];

  const { data } = useQuery(getUsersQuery);
  const { loading: meGetLoading, error: meGetError, data: meGetData } = useQuery(meQuery);
  const {
    loading: loadingGetPost,
    error: errorGetPos,
    data: dataGetPost,
  } = useQuery(GET_Post, {
    variables: { id: postUserId },
  });
  const FindUsername = dataGetPost?.post.user.username;

  const [unFollowUser, { error: unfollowError }] = useMutation(unFollowMutation);

  const unFollowHandleSubmit = async () => {
    unFollowUser({
      variables: {
        username: FindUsername,
      },
      update: (proxy, { data: unFollowUser }) => {
        const data = proxy.readQuery({
          query: getUsersQuery,
        });

        const findData = (data as any).users.filter(el => el.username == FindUsername);

        proxy.writeQuery({
          query: getUsersQuery,
          data: {
            ...(data as any),
            users: [unFollowUser.unFollowUser, findData[0].follower],
          },
        });
      },
    });
  };

  return { unFollowHandleSubmit, unfollowError };
}
