import { setRefresh_token } from '../../../lib/accessToken';
import { useLogoutMutation, useMeQuery } from '../../../types/apolloComponent';

export default function useGetUser() {
  const { data: getUser, loading, error } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  const logoutButton = async () => {
    if (!loading && getUser.me) {
      await logout();
      setRefresh_token('');
      await client!.resetStore();
    }
  };

  return {
    loading,
    error,
    getUser,
    logoutButton,
  };
}
