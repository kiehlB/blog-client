import styled from 'styled-components';
import Image from 'next/image';

export type GridProps = {};

function Grid({}: GridProps) {
  return (
    <GridBlock>
      <FirstWrapper className="grid grid-cols-3 mxl:grid-cols-2 mmd:grid-cols-1">
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
  border: 1px solid red;
  margin: 0 auto;
`;

const FirstWrapper = styled.div``;

const C = styled.section``;

const FirstGrid = styled.section``;

const FisrtColumn = styled.section``;

const GridAuto = styled.section``;

export default Grid;
