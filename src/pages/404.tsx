import React from 'react';
import styled from 'styled-components';
import HomeIcon from '../components/HomeIcon';

import home from '../styles/error.module.css';

const Error404Tap = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background: #9aded6;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial;
`;

export type Error404Props = {};
export const item = ['login', 'register'];
function Error404(props: Error404Props) {
  return (
    <Error404Tap>
      <HomeIcon />
      <div className={home.container}>
        <div className={home.ripple} />

        <div className={home.earLeft}>
          <div className={home.earlineLeft} />
        </div>
        <div className={home.earRight}>
          <div className={home.earlineRight} />
        </div>
        <div className={home.head}>
          <div className={home.lightcircle} />
          <div className={home.face}>
            <div className={home.eyeLeft}>
              <div className={home.eyedot} />
            </div>

            <div className={home.eyeRight}>
              <div className={home.eyedot} />
            </div>

            <div className={home.nose}>
              <div className={home.nosedot} />
            </div>

            <div className={home.smile}>
              <div className={home.curve1} />
              <div className={home.curve2} />
            </div>
          </div>
        </div>

        <div className={home.body}>
          <div className={home.armLeft} />
          <div className={home.armRight} />
          <div className={home.legLeft} />
          <div className={home.legRight} />
        </div>

        <div className={home.tail} />
      </div>
    </Error404Tap>
  );
}

export default Error404;
