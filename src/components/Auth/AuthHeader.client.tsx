import styled from 'styled-components';

export type AuthHeaderProps = { HeaderName?: string };

function AuthHeader({ HeaderName }: AuthHeaderProps) {
  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">{HeaderName}</h1>
    </>
  );
}

const AuthHeaderBlock = styled.div``;

export default AuthHeader;
