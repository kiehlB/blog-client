import type { GetServerSideProps, NextPage } from 'next';
import Banner from '../components/Banner';
import Header from '../components/Base/Header';
import styled from 'styled-components';
import Footer from '../components/Footer/Footer';
import Grid from '../components/Grid';
import Main from '../components/Main';
import Next from '../components/Next';
import React, { useRef, useEffect } from 'react';
import FloatingHeader from '../components/Common/Floating';
import AppLayout from '../components/AppLayout';
import View from '../components/View';
import useGetUser from '../components/Base/hooks/useGetUser';
import { initializeApollo } from '../lib/apolloClient';
import { GET_Posts } from '../lib/graphql/posts';

const Home: NextPage = (post: any) => {
  const { getUser, loading, error, logoutButton } = useGetUser();

  const limitPosts = post?.post?.slice(0, 12);

  // if (process.browser) {
  //   const canvas = document.querySelector('canvas');
  //   const c = canvas.getContext('2d');

  //   canvas.width = innerWidth;
  //   canvas.height = innerHeight / 2;

  //   const mouse = {
  //     x: innerWidth / 2,
  //     y: innerHeight / 2,
  //   };

  //   const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

  //   let mouseDown = false;
  //   addEventListener('mousedown', () => {
  //     mouseDown = true;
  //   });

  //   addEventListener('mouseup', () => {
  //     mouseDown = false;
  //   });

  //   addEventListener('resize', () => {
  //     canvas.width = innerWidth;
  //     canvas.height = innerHeight;

  //     init();
  //   });

  //   // Objects
  //   class Particle {
  //     x: any;
  //     y: any;
  //     radius: any;
  //     color: any;
  //     constructor(x, y, radius, color) {
  //       this.x = x;
  //       this.y = y;
  //       this.radius = radius;
  //       this.color = color;
  //     }

  //     draw() {
  //       c.beginPath();
  //       c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  //       c.shadowColor = this.color;
  //       c.shadowBlur = 15;
  //       c.fillStyle = this.color;
  //       c.fill();
  //       c.closePath();
  //     }

  //     update() {
  //       this.draw();
  //     }
  //   }

  //   // Implementation
  //   let particles;
  //   /* @ts-ignore */
  //   function init() {
  //     particles = [];

  //     for (let i = 0; i < 1500; i++) {
  //       const canvasWidth = canvas.width + 1000;
  //       const canvasHeight = canvas.height + 2000;

  //       const x = Math.random() * canvasWidth - canvasWidth / 2;
  //       const y = Math.random() * canvasHeight - canvasHeight / 2;
  //       const radius = 2 * Math.random();

  //       const color = colors[Math.floor(Math.random() * colors.length)];
  //       particles.push(new Particle(x, y, radius, color));
  //     }
  //   }

  //   // Animation Loop
  //   let radians = 0;
  //   let alpha = 1;
  //   /* @ts-ignore */
  //   function animate() {
  //     requestAnimationFrame(animate);
  //     c.fillStyle = `rgba(255, 255, 255, ${alpha})`;
  //     c.fillRect(0, 0, canvas.width, canvas.height);

  //     c.save();
  //     c.translate(canvas.width / 2, canvas.height / 2);
  //     c.rotate(radians);
  //     particles.forEach(particle => {
  //       particle.update();
  //     });
  //     c.restore();

  //     radians += 0.001;

  //     if (mouseDown && alpha >= 0.03) {
  //       alpha -= 0.01;
  //     } else if (!mouseDown && alpha < 1) {
  //       alpha += 0.01;
  //     }
  //   }

  //   init();
  //   animate();
  // }


  return (
    <>
      {/* <AppLayout.MainNav>
        <Banner />
        <Header getUser={getUser} loading={loading} logoutButton={logoutButton} />
        <FloatingHeader getUser={getUser} loading={loading} logoutButton={logoutButton} />
      </AppLayout.MainNav>

      <AppLayout
        first={
          <AppLayout.First>
            <Main />
          </AppLayout.First>
        }
        second={
          <AppLayout.Second>
            <C>
              <Grid post={limitPosts} />
            </C>
            <E>
              <Next />
            </E>
          </AppLayout.Second>
        }
        third={
          <AppLayout.Third>
            <Footer />
          </AppLayout.Third>
        }
      /> */}
      <div>hello</div>
    </>
  );
};

export default Home;
const C = styled.div`
  margin: 6rem 0;
`;

const E = styled.div`
  height: 100%;
`;
{
  /* <C>
        <canvas></canvas>
      </C> */
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   const apolloClient = initializeApollo();

//   const postData = await apolloClient.query({
//     query: GET_Posts,
//   });

//   return { props: { post: postData.data.posts } };
// };
