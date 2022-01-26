import url from 'cloudinary-build-url/dist/cjs/url';
import styled from 'styled-components';
import AuthHeader from '../components/Auth/AuthHeader';

import AuthSocialButtonGroup from '../components/Auth/AuthSocialButtonGroup';
import GithubButton from '../components/Auth/Github';
import IsAuth from '../components/Auth/IsAuth';

import SignInForm from '../components/Auth/SignInForm';
import SignUpForm from '../components/Auth/SignUpForm';
import CircleButton from '../components/Common/CircleButton';
import View from '../components/View';

export type SignInProps = {};

function SignIn({}: SignInProps) {
  return (
    <>
      <View.Container>
        <View.Body>
          <section className="flex flex-col md:flex-row items-center">
            <div className="bg-indigo-600 hidden lg:block w-full lg:w-1/2 xl:w-2/3 h-screen">
              <img
                src="https://source.unsplash.com/random"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="bg-white w-full lg:max-w-lg lg:max-w-full lg:mx-auto lg:mx-0 lg:w-1/2 xl:w-1/3   px-6 lg:px-16 xl:px-12 mlg:mt-20 mlg:mb-36
              flex items-center justify-center">
              <div className="w-full h-100">
                <CircleButton />
                <AuthHeader HeaderName="Login to your account" />
                <SignInForm />
                <div className="my-6 border-gray-300 w-full" />
                <GithubButton />
                <IsAuth />
              </div>
            </div>
          </section>
        </View.Body>
      </View.Container>
    </>
  );
}

const SignInBlock = styled.div``;

const First = styled.div``;

const Second = styled.div``;

export default SignIn;
