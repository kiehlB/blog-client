import { setRefresh_token } from '../../../lib/accessToken';
import { useLogoutMutation, useMeQuery } from '../../../types/apolloComponent';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../store/user';

export default function useGetUser() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: getUser, loading, error } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  const logoutButton = async () => {
    if (!loading && getUser.me) {
      await logout();

      await client.clearStore().then(() => {
        client.resetStore();
        dispatch(userLogout());
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
