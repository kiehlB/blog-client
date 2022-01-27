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

export type WriteByMeProps = {};

function WriteByMe({}: WriteByMeProps) {
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

  const posts = getposts?.posts?.filter(
    ele => ele?.user?.username == getUser?.me?.username,
  );

  const getposts2 = {
    posts,
  };

  return (
    <>
      <AppLayout.MainNav>
        <Banner />
        <Header getUser={getUser} loading={loading} logoutButton={logoutButton} />
        <FloatingHeader getUser={getUser} loading={loading} logoutButton={logoutButton} />
      </AppLayout.MainNav>

      <AppLayout
        first={
          <AppLayout.First>
            <Main />
          </AppLayout.First>
        }
        second={
          <AppLayout.Second>
            <section className="my-24">
              {/* <Grid post={limitPosts} input={searchInput} change={onSearchChange} /> */}

              <Grid
                isLoding={isLoding}
                setIsLoding={setIsLoding}
                PostsLoading={PostsLoading}
                PostsError={PostsError}
                getposts={getposts2}
                fetchMore={fetchMore}
                networkStatus={networkStatus}
                data={data}
              />
            </section>
            <div className="h-fulll">
              <Next isLoding={isLoding} setIsLoding={setIsLoding} />
            </div>
          </AppLayout.Second>
        }
        third={
          <AppLayout.Third>
            <Footer />
          </AppLayout.Third>
        }
      />
    </>
  );
}

const WriteByMeBlock = styled.div`
  height: 100%;
`;

export default WriteByMe;
