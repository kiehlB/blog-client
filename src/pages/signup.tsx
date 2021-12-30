import styled from 'styled-components';
import AuthImg from '../components/Auth/AuthImg.client';
import AuthSocialButtonGroup from '../components/Auth/AuthSocialButtonGroup';
import SignUpForm from '../components/Auth/SignUpForm';

export type SignUpProps = {};

function SignUp({}: SignUpProps) {
  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <AuthImg />
        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center">
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Log in to your account
            </h1>
            <SignUpForm />
            <div className="my-6 border-gray-300 w-full" />
            <AuthSocialButtonGroup />
            <p className="mt-8">
              Need an account?{' '}
              <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

const SignUpBlock = styled.div``;

const First = styled.div``;

const Second = styled.div``;

export default SignUp;
