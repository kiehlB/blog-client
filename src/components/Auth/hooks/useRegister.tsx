import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useForms from '../../../hooks/useForm';
import { registerMutation } from '../../../lib/graphql/users';

export default function useRegister() {
  const router = useRouter();
  const [inputs, handleChange] = useForms({
    username: '',
    email: '',
    password: '',
  });

  const [signUp, { error: registerError }] = useMutation(registerMutation, {
    onCompleted({ signUp }) {
      router.push('/login');
    },
  });

  return { inputs, handleChange, signUp };
}
