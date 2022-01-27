import type { GetServerSideProps, NextPage } from 'next';
import Banner from '../components/Banner';
import Header from '../components/Base/Header';
import styled from 'styled-components';
import Footer from '../components/Footer/Footer';
import Grid from '../components/Grid';
import Main from '../components/Main';
import Next from '../components/Next';
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import FloatingHeader from '../components/Common/Floating';
import AppLayout from '../components/AppLayout';
import View from '../components/View';
import useGetUser from '../components/Base/hooks/useGetUser';
import { initializeApollo } from '../lib/apolloClient';
import { GET_Posts } from '../lib/graphql/posts';
import useGetPosts from '../components/Post/hooks/useGetPosts';
import useForms from '../hooks/useForm';
import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import useGetSearchPosts from '../components/Main/hooks/useGetSearchPosts';

export type LikedPostProps = {};

function LikedPost({}: LikedPostProps) {
  const { getUser, loading, error, logoutButton } = useGetUser();
  const [isLoding, setIsLoding] = useState(false);

  const observerRef = useRef(null);
  const [buttonRef, setButtonRef] = useState(null);
  const input = useSelector((state: RootState) => state.post.input);
  const {
    loading: searchPostsLoading,
    error: searchPostsError,
    data,
  } = useGetSearchPosts(input);
  const {
    loading: PostsLoading,
    error: PostsError,
    data: getposts,
    fetchMore,
    networkStatus,
  } = useGetPosts();

  const posts = getposts?.posts?.filter(ele => ele.liked === true);

  const a = {
    posts,
  };

  return (
    <>
      <Banner />
      <Header getUser={getUser} loading={loading} logoutButton={logoutButton} />
      <FloatingHeader getUser={getUser} loading={loading} logoutButton={logoutButton} />
      <Main />
      {/* <Grid
        isLoding={isLoding}
        setIsLoding={setIsLoding}
        PostsLoading={PostsLoading}
        PostsError={PostsError}
        getposts={a}
        fetchMore={fetchMore}
        networkStatus={networkStatus}
        data={data}
      /> */}

      <div className="h-fulll">
        <Next isLoding={isLoding} setIsLoding={setIsLoding} />
      </div>
      <Footer />
    </>
  );
}

const LikedPostBlock = styled.div`
  height: 100%;
`;

export default LikedPost;
