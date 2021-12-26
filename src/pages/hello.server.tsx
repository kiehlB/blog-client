import styled from 'styled-components';
import { Suspense } from 'react';
import Server from '../components/server.server';
import Client from '../components/client.client';

export type HelloProps = {};

export default function Hello({}: HelloProps) {
  return (
    <>
      <Suspense fallback={'Loading...'}>
        <div>hello</div>
      </Suspense>
      <Server />
      <Client />
    </>
  );
}

const HelloBlock = styled.div``;
