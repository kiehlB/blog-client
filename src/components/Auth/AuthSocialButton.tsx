import styled from 'styled-components';
import S from '../../../public/svg/icon-email.svg';

export type AuthSocialButtonProps = {
  provider: 'facebook' | 'google' | 'github';
  tabIndex?: number;
  currentPath?: string;
};

const providerMap = {
  github: {
    color: '#272e33',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 32 32">
        <path
          fill="currentColor"
          d="M16 16.871L1.019 5H30.98L16 16.871zm0 3.146L1 8.131V27h30V8.131L16 20.017z"
        />
      </svg>
    ),
    border: false,
  },
};

function AuthSocialButton({ provider, tabIndex, currentPath }: AuthSocialButtonProps) {
  const info = providerMap[provider];
  const { icon: Icon, color, border } = info;
  return (
    <AuthSocialButtonBlock>
      <Icon />
    </AuthSocialButtonBlock>
  );
}

const AuthSocialButtonBlock = styled.div``;

export default AuthSocialButton;
