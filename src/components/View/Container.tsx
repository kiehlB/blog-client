import React from 'react';
import styled from 'styled-components';

const ContainerTap = styled.div``;

export type ContainerProps = { children: React.ReactNode };

function Container(props: ContainerProps) {
  return <div>{props.children}</div>;
}

export default Container;
