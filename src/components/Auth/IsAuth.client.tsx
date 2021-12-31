import styled from 'styled-components';

export type IsAuthProps = {};

function IsAuth({}: IsAuthProps) {
  return (
    <p className="mt-8">
      Need an account?{' '}
      <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold">
        Create an account
      </a>
    </p>
  );
}

const IsAuthBlock = styled.div``;

export default IsAuth;
