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

  const onSearchSubmit = () => {
    console.log(searchInput);
    dispatch(getSearchInput(searchInput));
  };

  return (
    <MainBlock className="max-w-9xl mx-auto sm:px-6 m2xl:px-10  mmd:px-4">
      {WindowWidth.width > 768 ? (
        <MainTitle>
          The best dev
          <br /> articles every day.
        </MainTitle>
      ) : (
        <MinMainTitle>The best dev articles every day.</MinMainTitle>
      )}

      <MainSubTitle>Find the latest of my writing here.</MainSubTitle>
      <TailWrapper>
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
        <ButtonWapprer>
          <Button
            onClick={e => onSearchSubmit()}
            bgColor="regal-sky"
            className="text-sm !font-bold w-32 h-10  !rounded-full -z-50">
            Search Now
          </Button>
        </ButtonWapprer>
      </TailWrapper>
    </MainBlock>
  );
}

const MainBlock = styled.div`
  margin: 0 auto;
  height: 18rem;
  margin-top: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${media.custom(768)} {
  }
`;

const MainTitle = styled.div`
  font-size: 2.875rem;
  font-weight: 600;
  line-height: 3.625rem;
  color: #1f2d3d;
  font-family: 'Matter';
  ${media.custom(768)} {
    font-size: 2rem;
  }
`;

const MinMainTitle = styled.div`
  font-size: 2.875rem;
  font-weight: 600;
  line-height: 3.625rem;
  width: 100%;
  text-align: center;

  color: #1f2d3d;
  font-family: 'Matter';
  ${media.custom(768)} {
    font-size: 2rem;
  }
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

const TailWrapper = styled.div`
  ${media.custom(768)} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ButtonWapprer = styled.div`
  padding-top: 1rem;
  ${media.custom(768)} {
    display: flex;
    justify-content: center;
  }
`;
export default Main;
