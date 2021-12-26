import styled from 'styled-components';
import media from '../../lib/styles/media';
import Button from '../Common/TailButton';

export type BannerProps = {};

function Banner({}: BannerProps) {
  return (
    <BannerBlock>
      <BannerWrapper>
        <BannerText>
          📹 New! Remote User Testing - Get video + voice feedback on designs and
          prototypes
        </BannerText>
        <Button className="text-sm !font-medium">Read More</Button>
      </BannerWrapper>
    </BannerBlock>
  );
}

const BannerBlock = styled.div`
  height: 3.125rem;
  background-color: #7e5bef;
  ${media.custom(768)} {
    height: 6.5rem;
  }
`;

const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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
