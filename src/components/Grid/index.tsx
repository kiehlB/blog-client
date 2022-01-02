import styled from 'styled-components';
import Image from 'next/image';
import Button from '../Common/TailButton';

export type GridProps = {};

function Grid({}: GridProps) {
  return (
    <GridBlock>
      <FirstWrapper className="grid gap-9 grid-cols-3 mxl:grid-cols-2 mmd:grid-cols-1">
        {/* <FirstGrid className="border border-black col-span-3 mxl:col-span-2 mmd:col-span-1  ">
          <FisrtColumn className="">
            <GridAuto>
              <img
                src="https://media.vlpt.us/images/ictechgy/post/6504eca7-b160-4e21-8ce4-39fe1f02e55c/MVVM%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4%ED%91%9C%EC%A7%80.png"
                alt="Picture of the author"
              />
              <div>글</div>
            </GridAuto>
          </FisrtColumn>
        </FirstGrid> */}

        <C className="border border-black">
          <ContentImg
            src="https://media.vlpt.us/images/ictechgy/post/6504eca7-b160-4e21-8ce4-39fe1f02e55c/MVVM%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4%ED%91%9C%EC%A7%80.png"
            alt="Picture of the author"
          />

          <PostContent>
            <PostTitle>
              나는야 텍스트나는야 텍스트나는야 텍스트나는야 텍스트나는야 텍스트나는야
              텍스트나는야 텍스트나는야 텍스트
            </PostTitle>
            <ByWho>
              나는야 텍스트 나는야 텍스트나는야 텍스트나는야 텍스트나는야 텍스트
            </ByWho>
            <PostBody>
              나는야 텍스트 나는야 텍스트나는야 텍스트나는야 텍스트나는야 텍스트나는야
              텍스트나는야 텍스트나는야 텍스트나는야 텍스트 나는야 텍스트나는야
              텍스트나는야 텍스트나는야 텍스트나는야 텍스트나는야 텍스트나는야
              텍스트나는야 텍스트나는야 텍스트나는야 텍스트나는야 텍스트
            </PostBody>
          </PostContent>
          <PostButtonWrapper>
            <Button>Read more</Button>
          </PostButtonWrapper>
        </C>
        <C className="border border-black">
          <img
            src="https://media.vlpt.us/images/ictechgy/post/6504eca7-b160-4e21-8ce4-39fe1f02e55c/MVVM%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4%ED%91%9C%EC%A7%80.png"
            alt="Picture of the author"
          />
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
        </C>
        <C className="border border-black">
          <img
            src="https://media.vlpt.us/images/ictechgy/post/6504eca7-b160-4e21-8ce4-39fe1f02e55c/MVVM%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4%ED%91%9C%EC%A7%80.png"
            alt="Picture of the author"
          />
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
        </C>
        <C className="border border-black">
          <img
            src="https://media.vlpt.us/images/ictechgy/post/6504eca7-b160-4e21-8ce4-39fe1f02e55c/MVVM%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4%ED%91%9C%EC%A7%80.png"
            alt="Picture of the author"
          />
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
        </C>
        <C className="border border-black">
          <img
            src="https://media.vlpt.us/images/ictechgy/post/6504eca7-b160-4e21-8ce4-39fe1f02e55c/MVVM%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4%ED%91%9C%EC%A7%80.png"
            alt="Picture of the author"
          />
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
          <div>나는야 텍스트</div>
        </C>
      </FirstWrapper>
    </GridBlock>
  );
}

const GridBlock = styled.div`
  max-width: 82.5rem;
  margin: 0 auto;
`;

const FirstWrapper = styled.div`
  padding: 0 1rem;
`;

const C = styled.section``;

const ContentImg = styled.img``;

const PostContent = styled.section`
  margin-top: 2.5rem;
  padding: 0rem 1.5rem;
  &::before {
    content: '';
    position: absolute;
    margin: -3.5rem -0px;
    width: 8.5rem;
    height: 1.375rem;
    background-color: #1fb6ff;
    line-height: 22px;
    font-size: 12px;
    font-weight: 500;
    padding: 0px 5px 0px 5px;
    color: white;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PostTitle = styled.section`
  font-size: 1.625rem;
  line-height: 2.125rem;
  color: #1f2d2d;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ByWho = styled.section`
  font-size: 1rem;
  line-height: 1.5rem;
  color: #3c4858;

  margin-top: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostBody = styled.section`
  line-height: 24px;
  color: #3c4858;
  font-weight: 300;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostButtonWrapper = styled.section`
  margin: 1.5rem 0;
  padding: 0rem 1.5rem;
`;

export default Grid;
