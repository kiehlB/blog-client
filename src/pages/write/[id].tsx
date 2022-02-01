import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditorMain from '../../components/Write';

const WriteTap = styled.div``;

export type WriteProps = {};

function Write(props: WriteProps) {
  useEffect(() => {
    const isData = window.localStorage.getItem('img');
    if (isData) {
    } else {
    }
    window.localStorage.setItem('img', 'img');
    window.onunload = () => {
      window.localStorage.clear();
    };
  }, []);
  return (
    <>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
      <EditorMain />
    </>
  );
}

export default Write;
