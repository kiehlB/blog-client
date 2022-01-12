import styled from 'styled-components';
import Image from 'next/image';
import Button from '../Common/TailButton';
import media from '../../lib/styles/media';
import draftToHtml from 'draftjs-to-html';

import PostItem from './PostItem';

export type GridProps = {
  post: any;
};

function Grid({ post }: GridProps) {
  return (
    <GridBlock>
      <FirstWrapper className="grid gap-9 grid-cols-3 mxl:grid-cols-2 mmd:grid-cols-1 auto-rows-fr">
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
        {post?.map(ele => (
          <>
            <PostItem post={ele} />
          </>
        ))}
      </FirstWrapper>
    </GridBlock>
  );
}

const GridBlock = styled.div`
  max-width: 82.5rem;
  margin: 0 auto;
`;

const FirstWrapper = styled.div`
  grid-auto-rows: 1fr;

  ${media.custom(1440)} {
    padding: 0 1.5rem;
  }
`;

export default Grid;
