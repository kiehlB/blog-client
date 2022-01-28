import { useMutation } from '@apollo/client';

import { useRouter } from 'next/router';

import useForms from '../../../hooks/useForm';
import { loginMutation } from '../../../lib/graphql/users';

export default function useLogin() {
  const [inputs, handleChange] = useForms({
    email: '',
    password: '',
  });

  const router = useRouter();
  const [login, { error: loginError }] = useMutation(loginMutation, {
    onCompleted({ login }) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', 'In');
      }
      router.push('/');
    },
  });

  return { inputs, handleChange, login, loginError };
}
