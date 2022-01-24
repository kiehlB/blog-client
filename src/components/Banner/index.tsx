import styled from 'styled-components';
import media from '../../lib/styles/media';
import Button from '../Common/TailButton';
import Link from 'next/link';

export type BannerProps = {};

function Banner({}: BannerProps) {
  return (
    <BannerBlock className="h-12 bg-banner-color">
      <BannerWrapper className="w-full flex justify-center  flex-wrap items-center">
        <BannerText>
          📹 New! Remote User Testing - Get video + voice feedback on designs and
          prototypes
        </BannerText>
        <Link href="/about">
          <Button className="text-sm ! font-medium">Read More</Button>
        </Link>
      </BannerWrapper>
    </BannerBlock>
  );
}

const BannerBlock = styled.div`
  ${media.custom(768)} {
    height: 6.5rem;
  }
`;

const BannerWrapper = styled.div`
  ${media.custom(768)} {
    height: 6.5rem;
  }
`;

const BannerText = styled.div`
  font-size: 1rem;
  letter-spacing: -0.2px;
  text-decoration: none solid rgb(255, 255, 255);
  color: #ffff;
  line-height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.125rem;
  margin-right: 15px;
  font-family: 'Matter';

  ${media.custom(768)} {
    text-align: center;
  }
`;
export default Banner;
