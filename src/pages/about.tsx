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
import AboutMain from '../components/About';
import TimeLine from '../components/About/TimeLine';
import AboutForm from '../components/About/AboutForm';

export type AboutProps = {};

function About({}: AboutProps) {
  const { getUser, loading, error, logoutButton } = useGetUser();

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
            <AboutMain />
            <TimeLine />
          </AppLayout.First>
        }
        second={<AppLayout.Second></AppLayout.Second>}
        third={
          <AppLayout.Third>
            <Footer />
          </AppLayout.Third>
        }
      />
    </>
  );
}

const AboutBlock = styled.div``;

export default About;
