import styled from 'styled-components';
import useForms from '../../hooks/useForm';
import LabelInput from '../LabelInput/LabelInput';
import useRegister from './hooks/useRegister';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { userGet, userStart } from '../../store/user';

export type SocialFormProps = {};

export const prod = process.env.NODE_ENV === 'production';

const isProd = prod
  ? 'https://api.woongblog.xyz/api/v2/auth/register'
  : 'http://localhost:3000/api/v2/auth/register';

function SocialForm({}: SocialFormProps) {
  const dispatch = useDispatch();
  const [inputs, handleChange] = useForms({
    profileName: '',
    username: '',
    bio: '',
  });

  const router = useRouter();

  const register = async e => {
    e.preventDefault();
    const auths = JSON.stringify(inputs);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        'https://www.woongblog.xyz/api/v2/auth/register',
        auths,
        config,
      );

      if (response) {
        dispatch(userStart());
        dispatch(userGet());

        router.push('/');
      }
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response; // take everything but 'request'
      console.log(errorObject);
    }
  };

  return (
    <form className="mt-8" onSubmit={register}>
      <div>
        <label className="block text-gray-700">Profile Name</label>
        <LabelInput
          label="ProfileName"
          name="profileName"
          type="text"
          value={inputs?.profileName}
          onChange={handleChange}
          placeholder="Enter profileName"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none  "
        />
      </div>

      <div className="mt-6">
        <label className="block text-gray-700">UserName</label>
        <LabelInput
          label="Username"
          name="username"
          type="text"
          value={inputs?.username}
          onChange={handleChange}
          placeholder="Enter username"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none  "
        />
      </div>

      <div className="mt-6">
        <label className="block text-gray-700">Bio</label>
        <LabelInput
          label="Bio"
          name="bio"
          type="text"
          value={inputs?.bio}
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
        className="w-full block bg-regal-sky hover:bg-sky-600 text-white font-semibold rounded-lg
            px-4 py-3 mt-6">
        Sign Up
      </button>
    </form>
  );
}

const SignUpFormBlock = styled.div``;

export default SocialForm;
