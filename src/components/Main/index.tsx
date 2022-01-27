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
      <MainTitle className="font-semibold font-mat text-5xl   leading-tight text-main-text mmd:text-center mmd:text-3xl">
        The best dev
        <br /> articles every day.
      </MainTitle>

      <MainSubTitle className="text-lg font-mat font-light leading-7 text-small-text mmd:text-center">
        Find the latest of my writing here.
      </MainSubTitle>
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

const MainTitle = styled.div``;

const MinMainTitle = styled.div``;
const MainSubTitle = styled.div``;

const TailWrapper = styled.form``;

const ButtonWapprer = styled.div``;
export default Main;
