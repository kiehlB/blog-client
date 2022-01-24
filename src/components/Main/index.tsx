import styled from 'styled-components';
import { useWindowSize } from '../../hooks/useWindowSize';
import media from '../../lib/styles/media';

import Button from '../Common/TailButton';
import TailInput from '../Common/TailInput';
import LabelInput from '../LabelInput/LabelInput';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchInput } from '../../store/post';
import useGetSearchPosts from './hooks/useGetSearchPosts';
import { useQuery, gql, useMutation } from '@apollo/client';
import { GET_Search_Posts } from '../../lib/graphql/posts';

export type MainProps = {};

function Main(props: MainProps) {
  const WindowWidth = useWindowSize();
  const dispatch = useDispatch();

  const [searchField, setSearchField] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const onSearchChange = useCallback(
    e => {
      setSearchInput(e.target.value);
    },

    [],
  );

  const onSearchSubmit = e => {
    e.preventDefault();
    dispatch(getSearchInput(searchInput));
  };

  return (
    <MainBlock className="flex flex-col justify-around max-w-9xl h-72 mt-20 mx-auto sm:px-6 m2xl:px-10  mmd:px-4">
      {WindowWidth.width > 768 ? (
        <MainTitle className="text-5xl font-semibold leading-tight text-main-text mmd:text-3xl">
          The best dev
          <br /> articles every day.
        </MainTitle>
      ) : (
        <MinMainTitle className="w-full text-5xl font-semibold leading-tight text-center text-main-text mmd:text-3xl">
          The best dev articles every day.
        </MinMainTitle>
      )}

      <MainSubTitle>Find the latest of my writing here.</MainSubTitle>
      <TailWrapper
        onClick={e => onSearchSubmit(e)}
        className="mmd:flex justify-center items-center flex-col">
        <LabelInput
          label="SearchInput"
          name="searchInput"
          type="text"
          value={searchInput}
          onChange={onSearchChange}
          placeholder="Search..."
          className={clsx(
            'w-96 py-1.5 px-3 rounded-md dark:bg-dark mmd:w-5/6',
            'border border-gray-300 dark:border-gray-600',
            'dark:focus:border-primary-300 focus:border-primary-300 focus:ring-0 focus:outline-none',
          )}
        />
        <ButtonWapprer className="mt-4 mmd:flex justify-center">
          <Button
            bgColor="regal-sky"
            className="text-sm !font-bold w-32 h-10  !rounded-full -z-50">
            Search Now
          </Button>
        </ButtonWapprer>
      </TailWrapper>
    </MainBlock>
  );
}

const MainBlock = styled.div``;

const MainTitle = styled.div`
  font-family: 'Matter';
`;

const MinMainTitle = styled.div`
  font-family: 'Matter';
`;
const MainSubTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 300;
  line-height: 1.75rem;
  color: #3c4858;
  font-family: 'Matter';
  ${media.custom(768)} {
    text-align: center;
  }
`;

const TailWrapper = styled.form``;

const ButtonWapprer = styled.div``;
export default Main;
