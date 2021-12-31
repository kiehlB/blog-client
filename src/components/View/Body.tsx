import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'evergreen-ui';
import { SPINNER_SIZE } from '../../lib/styles/constants';

const BodyTap = styled.div``;

export type BodyProps = {
  children: React.ReactNode;
  isLoading?: boolean;
};

function Body(props: BodyProps) {
  return (
    <div>
      {props.children}
      {props.isLoading && (
        <div className="view__body">
          <Spinner size={SPINNER_SIZE} />
        </div>
      )}
    </div>
  );
}

export default Body;
