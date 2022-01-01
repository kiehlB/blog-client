import styled from 'styled-components';
import { setAccessToken } from '../../lib/accessToken';
import { MeDocument, MeQuery } from '../../types/apolloComponent';
import LabelInput from '../LabelInput/LabelInput';
import useLogin from './hooks/useLogin';

export type SignInFormProps = {};

function SignInForm({}: SignInFormProps) {
  const { inputs, handleChange, login } = useLogin();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await login({
      variables: inputs,
      update: (store, { data }) => {
        if (!data) {
          return null;
        }

        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.login.username,
          },
        });
      },
    });

    if (response.data) {
      setAccessToken(response.data.login.accessToken);
    }
  };

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <div className="mt-6">
        <label className="block text-gray-700">Email Address</label>
        <LabelInput
          label="Email"
          name="email"
          type="text"
          value={inputs?.email}
          onChange={handleChange}
          placeholder="Enter Email Address"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none  "
        />
      </div>

      <div className="mt-6">
        <label className="block text-gray-700">Password</label>
        <LabelInput
          label="PassWord"
          name="password"
          type="password"
          value={inputs?.password}
          onChange={handleChange}
          placeholder="Enter Password"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
            focus:bg-white focus:outline-none"
        />
      </div>

      <div className="text-right mt-2">
        <a
          href="#"
          className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
          Forgot Password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full block bg-indigo-500 hover:bg-indigo-400  text-white font-semibold rounded-lg
          px-4 py-3 mt-6">
        Log In
      </button>
    </form>
  );
}

const SignInFormBlock = styled.div``;

export default SignInForm;
