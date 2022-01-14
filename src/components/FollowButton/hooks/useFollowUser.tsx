import { useQuery, gql, useMutation } from '@apollo/client';

import { useRouter } from 'next/router';
import { GET_Post } from '../../../lib/graphql/posts';
import { followMutation, getUsersQuery, meQuery } from '../../../lib/graphql/users';

export default function useFollowUserTo() {
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
  const findName = meGetData?.me?.id;

  const FindUsername = dataGetPost?.post.user.username;
  const isFollowing = data?.users?.find(el => el.username == FindUsername);
  const BooleanIsFollowing = Boolean(isFollowing?.follower?.follower_id == findName);

  const [followUser, { error }] = useMutation(followMutation);

  const followHandleSubmit = async () => {
    const response = await followUser({
      variables: {
        username: FindUsername,
      },
      update: (proxy, { data: followUser }) => {
        const data = proxy.readQuery({
          query: getUsersQuery,
        });

        const findData = (data as any).users.filter(el => el.username == FindUsername);

        proxy.writeQuery({
          query: getUsersQuery,
          data: {
            ...(data as any),
            users: [followUser?.followUser, findData[0]?.follower],
          },
        });
      },
    });
    return response;
  };

  return { useFollowUserTo, followHandleSubmit, BooleanIsFollowing, error };
}
