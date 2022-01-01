import styled from 'styled-components';
import Link from 'next/link';

export type CircleButtonProps = {};

function CircleButton({}: CircleButtonProps) {
  return (
    <Link href="/">
      <CircleWraper className="group hover:bg-regal-sky transition-colors group-hover:fill-white">
        <IconBlack>
          <svg viewBox="0 0 6 10" width="6" height="10" data-reactid="14">
            <path
              className="group-hover:fill-white  transition-colors"
              fill="#3e4854"
              d="M5.7,8.3L2.4,5l3.3-3.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-4,4c-0.4,0.4-0.4,1,0,1.4l4,4 C4.5,9.9,4.7,10,5,10s0.5-0.1,0.7-0.3C6.1,9.3,6.1,8.7,5.7,8.3z"
              data-reactid="15"></path>
          </svg>
        </IconBlack>
      </CircleWraper>
    </Link>
  );
}

const CircleWraper = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #b7bec7;
  border-radius: 50%;
`;

const IconBlack = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CircleButton;
