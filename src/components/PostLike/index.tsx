import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import styles from './index.module.scss';
import media from '../../lib/styles/media';

import useGetUser from '../Base/hooks/useGetUser';
import { toast, ToastContainer } from 'react-nextjs-toast';
import { useWindowSize } from '../../hooks/useWindowSize';
const PostLikeTap = styled.div<{ isLikeBoolean: boolean }>`
  ${media.custom(1900)} {
    display: none;
  }
  

   ${media.minCustom(2000)} {
    display: none;
  }

  .heart {
    width: 0.5em;
    height: 0.5em;
    display: block;
    path {
      stroke: #ea442b;
      stroke-width: 2;
      fill: transparent;
      transition: fill 0.5s cubic-bezier(0.7, 0, 0.3, 1);
      fill: ${props => (props.isLikeBoolean ? '#ea442b' : '#fff')};
    }
    transform-origin: center 80%;
    .likebutton:focus & {
      animation: heart-bounce 0.5s cubic-bezier(0.7, 0, 0.3, 1);
      @keyframes heart-bounce {
        40% {
          transform: scale(0.7);
        }
        0%,
        80%,
        100% {
          transform: scale(1);
        }
      }
    }
  }
`;

export type PostLikeProps = {
  LikehandleSubmit: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isLikeBoolean: boolean;
  UnlikehandleSubmit: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  height?: any;
};

function PostLike(props: PostLikeProps) {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const size = useWindowSize();

  const { getUser, loading } = useGetUser();

  const onClickNotify = () => {
    toast.notify(`로그인이 필요합니다`, {
      duration: 2,
      type: 'error',
    });
  };

  const newHeight = props.height - 16 * 15;

  return (
    <>
      <>
        {!loading && getUser.me ? (
          <>
            <PostLikeTap isLikeBoolean={props.isLikeBoolean}>
              {props.isLikeBoolean ? (
                <div onClick={props.UnlikehandleSubmit}>
                  <a style={{ color: '#000' }} />

                  <button className={styles.likebutton}>
                    <div className={styles.likewrapper}>
                      <div className={styles.ripple} />
                      <svg className="heart" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                      </svg>
                    </div>
                  </button>
                </div>
              ) : (
                <div
                  onClick={e => {
                    props.LikehandleSubmit(e);
                  }}>
                  <a style={{ color: '#000' }} />

                  <button className={styles.likebutton}>
                    <div className={styles.likewrapper}>
                      <div className={styles.ripple} />
                      <svg className="heart" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                      </svg>
                    </div>
                  </button>
                </div>
              )}
            </PostLikeTap>
          </>
        ) : (
          <>
            <ToastContainer align={'left'} />
            <PostLikeTap isLikeBoolean={props.isLikeBoolean}>
              <div
                onClick={e => {
                  onClickNotify();
                }}>
                <a style={{ color: '#000' }} />

                <button className={styles.likebutton}>
                  <div className={styles.likewrapper}>
                    <div className={styles.ripple} />
                    <svg className="heart" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                    </svg>
                  </div>
                </button>
              </div>
            </PostLikeTap>
          </>
        )}
      </>
    </>
  );
}

export default PostLike;
