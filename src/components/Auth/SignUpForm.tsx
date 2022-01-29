import styled from 'styled-components';
import LabelInput from '../LabelInput/LabelInput';
import useRegister from './hooks/useRegister';

export type SignUpFormProps = {};

function SignUpForm({}: SignUpFormProps) {
  const { inputs, handleChange, signUp, handleSubmit, registerError } = useRegister();

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <div>
        <div className="text-sm py-2">
          {registerError &&
            registerError.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
            ))}
        </div>
        <label className="block text-gray-700">UserName</label>
        <LabelInput
          label="Username"
          name="username"
          type="text"
          value={inputs?.username}
          onChange={handleChange}
          placeholder="Enter Email Address"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none  "
        />
      </div>

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
        className="w-full block bg-regal-sky hover:bg-sky-600 text-white font-semibold rounded-lg
            px-4 py-3 mt-6">
        Sign Up
      </button>
    </form>
  );
}

const SignUpFormBlock = styled.div``;

export default SignUpForm;
