import url from 'cloudinary-build-url/dist/cjs/url';
import styled from 'styled-components';
import AuthHeader from '../components/Auth/AuthHeader.client';
import AuthSocialButtonGroup from '../components/Auth/AuthSocialButtonGroup';
import IsAuth from '../components/Auth/IsAuth.client';
import SignInForm from '../components/Auth/SignInForm';
import SignUpForm from '../components/Auth/SignUpForm';
import View from '../components/View';

export type SignInProps = {};

function SignIn({}: SignInProps) {
  return (
    <>
      <View.Container>
        <View.Body>
          <section className="flex flex-col md:flex-row h-screen items-center">
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
              <img
                src="https://source.unsplash.com/random"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
  flex items-center justify-center">
              <div className="w-full h-100">
                <AuthHeader HeaderName="Login to your account" />
                <SignInForm />
                <div className="my-6 border-gray-300 w-full" />
                <AuthSocialButtonGroup />
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
