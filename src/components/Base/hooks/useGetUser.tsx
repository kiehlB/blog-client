import { setRefresh_token } from '../../../lib/accessToken';
import { useLogoutMutation, useMeQuery } from '../../../types/apolloComponent';
import { useRouter } from 'next/router';

export default function useGetUser() {
  const router = useRouter();
  const { data: getUser, loading, error } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  const logoutButton = async () => {
    if (!loading && getUser.me) {
      await logout();

      await client.clearStore().then(() => {
        client.resetStore();

        router.push('/');
      });
    }
  };

  return {
    loading,
    error,
    getUser,
    logoutButton,
  };
}
