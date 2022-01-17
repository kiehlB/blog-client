import React from 'react';
import home from './home.module.scss';
import classNames from 'classnames';

export type HomeProps = {};

function HomeIcon(props: HomeProps) {
  const roofClass = classNames(`${home.roof} ${home.roof1}`);
  const roofClass2 = classNames(`${home.roof} ${home.roof2}`);
  const roofClass3 = classNames(`${home.roofDesign} ${home.roofDesign1}`);
  const roofClass4 = classNames(`${home.roofDesign} ${home.roofDesign2}`);
  const roofClass5 = classNames(`${home.roofSide} ${home.roofSide1}`);
  const roofClassSide = classNames(`${home.roofSide} ${home.roofSide2}`);
  const roofClass6 = classNames(`${home.roofWall} ${home.roofWall1}`);
  const roofClass7 = classNames(`${home.roofWall} ${home.roofWall2}`);
  const roofClass8 = classNames(`${home.wall} ${home.wall1}`);
  const roofClass9 = classNames(`${home.wall} ${home.wall2}`);
  const roofClass10 = classNames(`${home.wall} ${home.wall3}`);
  const roofClass11 = classNames(`${home.wall} ${home.wall4}`);

  return (
    <>
      <button className={home.btnChallenge}>
        <span>404</span>
        <small>홈으로</small>
        <div className={home.hoverArea}>
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.hoverCol} />
          <div className={home.iconHome}>
            <div className={roofClass} />
            <div className={roofClass2} />
            <div className={roofClass3} />
            <div className={roofClass4} />
            <div className={roofClass5} />
            <div className={roofClassSide} />
            <div className={roofClass6} />
            <div className={roofClass7} />
            <div className={roofClass8} />
            <div className={roofClass9} />
            <div className={roofClass10} />
            <div className={roofClass11} />
            <div className={home.door} />
            <div className={home.floor} />
          </div>
        </div>
      </button>
    </>
  );
}

export default HomeIcon;
