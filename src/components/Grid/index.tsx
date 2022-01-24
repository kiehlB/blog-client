import styled from 'styled-components';
import Image from 'next/image';
import Button from '../Common/TailButton';
import media from '../../lib/styles/media';
import draftToHtml from 'draftjs-to-html';
import Link from 'next/link';
import PostItem from './PostItem';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RootState } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import PaginateWithScroll from '../Common/PaginateScroll';
import useGetSearchPosts from '../Main/hooks/useGetSearchPosts';

export type GridProps = {
  post: any;
  setIsLoding: any;
  isLoding: any;
  PostsLoading: any;
  PostsError: any;
  fetchMore: any;
  networkStatus: any;
};

function Grid({
  post,
  PostsLoading,
  setIsLoding,
  isLoding,
  PostsError,
  networkStatus,
  fetchMore,
}: GridProps) {
  const observerRef = useRef(null);
  const [buttonRef, setButtonRef] = useState(null);
  const input = useSelector((state: RootState) => state.post.input);
  const { loading, error, data } = useGetSearchPosts(input);

  console.log(data);
  const cursor = post?.length > 0 ? post[post.length - 1].id : null;

  const onLoadMore = useCallback((cursor: string) => {
    fetchMore({
      variables: {
        cursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          posts: [...fetchMoreResult.posts],
        };
      },
    });
  }, []);

  function searchList() {
    return (
      <>
        {data
          ? data?.searchPosts?.map(ele => (
              <>
                <PostItem post={ele} PostsLoading={PostsLoading} key={ele.id} />
              </>
            ))
          : ''}
      </>
    );
  }

  return (
    <GridBlock>
      <FirstWrapper
        className="grid gap-9 grid-cols-3 mxl:grid-cols-2 mmd:grid-cols-1 auto-rows-fr"
        id="list">
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

        {data
          ? data?.searchPosts?.map(ele => (
              <PostItem post={ele} PostsLoading={PostsLoading} key={ele.id} />
            ))
          : post?.map(ele => (
              <PostItem post={ele} key={ele.id} PostsLoading={PostsLoading} />
            ))}
        {isLoding ? <PaginateWithScroll cursor={cursor} onLoadMore={onLoadMore} /> : ''}
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

const F = styled.button``;

export default Grid;
