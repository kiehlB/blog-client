import type { GetServerSideProps, NextPage } from 'next';
import Banner from '../components/Banner';
import Header from '../components/Base/Header';
import styled from 'styled-components';
import Footer from '../components/Footer/Footer';
import Grid from '../components/Grid';
import Main from '../components/Main';
import Next from '../components/Next';
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import FloatingHeader from '../components/Common/Floating';
import AppLayout from '../components/AppLayout';
import View from '../components/View';
import useGetUser from '../components/Base/hooks/useGetUser';
import { initializeApollo } from '../lib/apolloClient';
import { GET_Posts } from '../lib/graphql/posts';
import useGetPosts from '../components/Post/hooks/useGetPosts';
import useForms from '../hooks/useForm';
import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import useGetSearchPosts from '../components/Main/hooks/useGetSearchPosts';
import cookieCutter from 'cookie-cutter';

const Home: NextPage = (props: any) => {
  const { getUser, loading, error, logoutButton } = useGetUser();

  const [isLoding, setIsLoding] = useState(false);

  const observerRef = useRef(null);
  const [buttonRef, setButtonRef] = useState(null);
  const input = useSelector((state: RootState) => state.post.input);
  const {
    loading: searchPostsLoading,
    error: searchPostsError,
    data,
  } = useGetSearchPosts(input);
  const {
    loading: PostsLoading,
    error: PostsError,
    data: getposts,
    fetchMore,
    networkStatus,
  } = useGetPosts();

  //canvas
  const canvasRef = useRef(null);
  function Circle(xCoordinate, yCoordinate, radius, ctx, mouseX, mouseY) {
    const colorArray = ['#272F32', '#9DBDC6', '#FF3D2E', '#DAEAEF'];
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.fillStyle = '#000000';
    // ctx.beginPath();
    // ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    // ctx.fill();
    const maxRadius = 35;

    const randomNumber = Math.floor(Math.random() * 4);
    const randomTrueOrFalse = Math.floor(Math.random() * 2);

    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.radius = radius;
    this.color = colorArray[randomNumber];

    if (randomTrueOrFalse == 1) {
      this.xVelocity = -Math.random() * 1;
    } else {
      this.xVelocity = Math.random() * 1;
    }

    if (randomTrueOrFalse == 1) {
      this.yVelocity = -Math.random() * 1;
    } else {
      this.yVelocity = Math.random() * 1;
    }

    // As distance gets closer to 0, increase radius

    this.update = function () {
      this.xCoordinate += this.xVelocity;
      const xDistance = mouseX - this.xCoordinate;
      const yDistance = mouseY - this.yCoordinate;
      const originalRadius = radius;
      this.yCoordinate += this.yVelocity;

      // Movement Functions
      if (
        this.xCoordinate + this.radius > ctx.canvas.width ||
        this.xCoordinate - this.radius < 0
      ) {
        this.xVelocity = -this.xVelocity;
      }
      if (
        this.yCoordinate + this.radius > ctx.canvas.height ||
        this.yCoordinate - this.radius < 0
      ) {
        this.yVelocity = -this.yVelocity;
      }

      // Radius Decrease Functions
      // When distance between circle center and mouse on horizontal axis is less than 50, increase radius until it is equal to 35
      if (
        xDistance < 50 &&
        xDistance > -50 &&
        this.radius < maxRadius &&
        yDistance < 50 &&
        yDistance > -50
      ) {
        this.radius += 2;
      } else if (
        (xDistance >= 50 && originalRadius < this.radius) ||
        (xDistance <= -50 && originalRadius < this.radius) ||
        (yDistance >= 50 && originalRadius < this.radius) ||
        (yDistance <= -50 && originalRadius < this.radius)
      ) {
        this.radius -= 2;
      }

      this.draw();
    };

    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.xCoordinate, this.yCoordinate, Math.abs(this.radius), 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId;
    let radians = 0;
    let alpha = 1;
    let particles = [];
    let mouseX;
    let mouseY;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const maxRadius = 35;

    canvas.onmousemove = function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);
      const myCircle = new Circle(30, 80, 10, ctx, mouseX, mouseY);
      let circleArray = [];

      for (let i = 0; i < 20; i++) {
        const randomXCoordinate = Math.random() * ctx.canvas.width;
        const randomYCoordinate = Math.random() * ctx.canvas.height;
        const randomRadius = Math.random() * 5;
        circleArray.push(
          new Circle(
            randomXCoordinate,
            randomYCoordinate,
            randomRadius,
            ctx,
            mouseX,
            mouseY,
          ),
        );
      }

      function updateAll() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        myCircle.update();
        for (let i = 0; i < circleArray.length; i++) {
          circleArray[i].update();
        }
        window.requestAnimationFrame(updateAll);
      }

      updateAll();
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [Circle]);

  return (
    <>
      <canvas ref={canvasRef} {...props} />
      <AppLayout.MainNav>
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
            <section className="my-24">
              {/* <Grid post={limitPosts} input={searchInput} change={onSearchChange} /> */}

              <Grid
                isLoding={isLoding}
                setIsLoding={setIsLoding}
                PostsLoading={PostsLoading}
                PostsError={PostsError}
                getposts={getposts}
                fetchMore={fetchMore}
                networkStatus={networkStatus}
                data={data}
              />
            </section>
            <div className="h-fulll">
              <Next isLoding={isLoding} setIsLoding={setIsLoding} />
            </div>
          </AppLayout.Second>
        }
        third={
          <AppLayout.Third>
            <Footer />
          </AppLayout.Third>
        }
      />
    </>
  );
};

export default Home;

{
  /* <C>
        <canvas></canvas>
      </C> */
}
