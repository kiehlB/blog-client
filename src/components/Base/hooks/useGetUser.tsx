import { setAccessToken } from '../../../lib/accessToken';
import { useLogoutMutation, useMeQuery } from '../../../types/apolloComponent';

export default function useGetUser() {
  const { data: getUser, loading, error } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  const logoutButton = async () => {
    console.log('yo im clicked');
    if (!loading && getUser.me) {
      await logout();
      setAccessToken('');
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
