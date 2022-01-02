import styled from 'styled-components';
import AppLayout from '../components/AppLayout';
import AuthHeader from '../components/Auth/AuthHeader';

import AuthSocialButtonGroup from '../components/Auth/AuthSocialButtonGroup';

import SignUpForm from '../components/Auth/SignUpForm';
import CircleButton from '../components/Common/CircleButton';
import View from '../components/View';

export type SignUpProps = {};

function SignUp({}: SignUpProps) {
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
                <CircleButton />
                <AuthHeader HeaderName="Sign Up" />
                <SignUpForm />
                <div className="my-6 border-gray-300 w-full" />
                <AuthSocialButtonGroup />
              </div>
            </div>
          </section>
        </View.Body>
      </View.Container>
    </>
  );
}

const Second = styled.div``;

export default SignUp;
