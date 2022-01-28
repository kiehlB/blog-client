import { useMutation } from '@apollo/client';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import useForms from '../../../hooks/useForm';
import { loginMutation } from '../../../lib/graphql/users';
import { userGet, userStart } from '../../../store/user';

export default function useLogin() {
  const dispatch = useDispatch();

  const [inputs, handleChange] = useForms({
    email: '',
    password: '',
  });

  const router = useRouter();
  const [login, { error: loginError }] = useMutation(loginMutation, {
    onCompleted({ login }) {
      dispatch(userStart());
      dispatch(userGet());

      router.push('/');
    },
  });

  return { inputs, handleChange, login, loginError };
}
