import styled from 'styled-components';
import media from '../../lib/styles/media';
import Button from '../Common/TailButton';
import Link from 'next/link';

export type BannerProps = {};

function Banner({}: BannerProps) {
  return (
    <BannerBlock className="h-12 bg-banner-color mmd:h-28">
      <BannerWrapper className="w-full flex justify-center  flex-wrap items-center mmd:h-28">
        <BannerText className="font-mat flex text-white leading-4 justify-center items-center h-12 mr-4 mmd:text-center">
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

const BannerBlock = styled.div``;

const BannerWrapper = styled.div``;

const BannerText = styled.div`
  font-size: 1rem;
  letter-spacing: -0.2px;
  text-decoration: none solid rgb(255, 255, 255);
`;
export default Banner;
