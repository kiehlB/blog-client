import styled from 'styled-components';

export type NextProps = {};

function Next({}: NextProps) {
  return (
    <NextBlock>
      <Wrapper>
        <TextWrapper>
          <span>Next</span>
          <Arrow>
            <svg
              width="34"
              height="24"
              viewBox="0 0 34 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  d="M33.78 11.1801C33.6888 10.9044 33.5386 10.6519 33.34 10.4401L23.63 0.61009C23.2322 0.212265 22.6926 -0.0112305 22.13 -0.0112305C21.5674 -0.0112305 21.0278 0.212265 20.63 0.61009C20.2322 1.00791 20.0087 1.54748 20.0087 2.11009C20.0087 2.6727 20.2322 3.21227 20.63 3.61009L27.05 10.0001H2C1.46957 10.0001 0.960859 10.2108 0.585786 10.5859C0.210714 10.9609 0 11.4697 0 12.0001C0 12.5305 0.210714 13.0392 0.585786 13.4143C0.960859 13.7894 1.46957 14.0001 2 14.0001H27L20.63 20.4001C20.2322 20.7979 20.0087 21.3375 20.0087 21.9001C20.0087 22.4627 20.2322 23.0023 20.63 23.4001C21.0278 23.7979 21.5674 24.0214 22.13 24.0214C22.6926 24.0214 23.2322 23.7979 23.63 23.4001L33.41 13.5801C33.7166 13.27 33.9175 12.871 33.9839 12.44C34.0503 12.0091 33.979 11.5681 33.78 11.1801Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_80_127">
                  <rect width="34" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Arrow>
        </TextWrapper>
      </Wrapper>
    </NextBlock>
  );
}

const NextBlock = styled.div`
  width: 100%;
  height: 7.875rem;
  background-color: #1fb6ff;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.625rem;
  font-weight: 600;
  color: #fff;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;

  & > div {
    position: absolute;

    width: 96%;
    display: flex;
    justify-content: flex-end;
  }
`;

const Arrow = styled.div``;

export default Next;
