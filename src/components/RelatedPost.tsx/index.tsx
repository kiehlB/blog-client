import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useWindowSize } from '../../hooks/useWindowSize';
import media from '../../lib/styles/media';
import PostItem from '../Grid/PostItem';

export type RelatedPostProps = {
  posts: any;
  div?: any;
};

function RelatedPost(props: RelatedPostProps) {
  const slicePost = props?.posts?.slice(0, 3);
  const size = useWindowSize();

  return (
    <RelatedPostBlock>
      <RelatedPostTitle>Related Posts</RelatedPostTitle>
      <GridBlock>
        <FirstWrapper className="grid gap-9 grid-cols-3  mmd:grid-cols-1 auto-rows-fr">
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

          {slicePost?.map(ele => (
            <PostItem post={ele} key={ele.id} />
          ))}
        </FirstWrapper>
      </GridBlock>
    </RelatedPostBlock>
  );
}

export default RelatedPost;

const RelatedPostTitle = styled.div`
  color: #fff;
  font-size: 1.625rem;
  font-weight: 600;

  text-align: center;
  height: 7.375rem;
`;

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
const RelatedPostBlock = styled.div`
  background-color: #000;
  height: 100%;
  padding: 5rem 0;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;
