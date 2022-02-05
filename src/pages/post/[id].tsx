import Link from 'next/link';
import ReactMarkdown from 'react-markdown/with-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
import { Image } from '../../components/Common/Image';
import { initializeApollo } from '../../lib/apolloClient';
import { GET_Post, GET_Posts } from '../../lib/graphql/posts';
import draftToHtml from 'draftjs-to-html';
import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkDecorator from '../../components/Write/Decorators';
import Header from '../../components/Base/Header';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer/Footer';
import media from '../../lib/styles/media';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import useGetUser from '../../components/Base/hooks/useGetUser';
import useGetPosts from '../../components/Post/hooks/useGetPosts';
import useGetComments from '../../components/Comments/hooks/useGetComments';
import useCreateComment from '../../components/Comments/hooks/useCreateComment';
import { useRouter } from 'next/router';
import { PostGet } from '../../store/post';
import { toast, ToastContainer } from 'react-nextjs-toast';
import CommentForm from '../../components/Comments/CommentForm';
import Comments from '../../components/Comments/Comments';
import SubCommentsForm from '../../components/Comments/SubCommentsForm';
import SubComments from '../../components/Comments/SubComments';
import useFollowUser from '../../components/FollowButton/hooks/useFollowUser';
import useUnfollowUser from '../../components/FollowButton/hooks/useUnfollowUser';
import usePostLike from '../../components/PostLike/hooks/usePostLike';
import usePostUnLike from '../../components/PostLike/hooks/usePostUnLike';
import useEditComment from '../../components/Comments/hooks/useEditComment';
import useDeleteComment from '../../components/Comments/hooks/useDeleteComment';
import useDeletePost from '../../components/Post/hooks/useDeletePost';
import Face from '../../components/FollowButton';
import PostLike from '../../components/PostLike';
import useGetPost from '../../components/Post/hooks/useGerPost';
import Moment from 'react-moment';
import RelatedPost from '../../components/RelatedPost';
import { Skeleton, SkeletonTexts } from '../../components/Common/Skeleton';
import { GetServerSideProps } from 'next';
import { TiHeartOutline } from 'react-icons/ti';
import { TiHeart } from 'react-icons/ti';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineUserDelete } from 'react-icons/ai';

export default function Post({}) {
  const dispatch = useDispatch();

  const [isInput, setisInput] = useState(false);
  const [height, setHeight] = useState(null);
  const getPost = useSelector((state: RootState) => state.post);
  const getIsAuth = useSelector((state: RootState) => state.user.isAuth);
  const { getUser: userData, loading: userLoding } = useGetUser();
  const { singlePostLoding, singlePostError, singlePostData } = useGetPost();
  const { loading: PostsLoading, error: PostsError, data } = useGetPosts();
  const { commentsLoading, commentsError, commentstData } = useGetComments();
  const {
    textOnChange,
    subTextOnChange,
    handleSubmit,
    subHandleSubmit,
    getText,
    getSubText,
    isOpen,
    setIsopen,
  } = useCreateComment();

  const { followHandleSubmit, error, BooleanIsFollowing } = useFollowUser();
  const { getUser, loading, error: asError, logoutButton } = useGetUser();

  const { unFollowHandleSubmit, unfollowError } = useUnfollowUser();

  const { LikehandleSubmit, isLikeBoolean } = usePostLike();
  const { UnlikehandleSubmit, isUnLikeBoolean } = usePostUnLike();
  const { DeletePostSubmit } = useDeletePost();
  const { EditCommentSubmit } = useEditComment();
  const { DeleteCommentSubmit } = useDeleteComment();

  const [on, toggle] = useState(false);
  const router = useRouter();

  const [editComment, setEditComment] = useState(false);

  const [editText, setEditText] = useState('');
  const [subEditText, subSetEditText] = useState('');

  if (commentsError) return <p>Error !!!!!!!!!!:(</p>;

  const getComments = commentstData?.comment.filter(el => el.post_id == router.query.id);

  // const username = findData.user.username;
  const findData = singlePostData?.post;
  const findId = singlePostData?.post?.id;

  const getPostData = () => {
    dispatch(PostGet(findData));
  };

  const editCommentInput = e => {
    setEditText(e.target.value);
  };

  const editSubCommentInput = e => {
    subSetEditText(e.target.value);
  };

  const fixComment = () => {
    setEditComment(!editComment);
  };

  const onClickNotify = e => {
    e.preventDefault();
    toast.notify(`로그인이 필요합니다`, {
      duration: 2,
      type: 'error',
    });
  };
  const onClickNotifyCheckString = e => {
    e.preventDefault();
    toast.notify(`댓글이 없습니다`, {
      duration: 2,
      type: 'error',
    });
  };
  const decorator = createLinkDecorator();

  // const defaultEditorState = EditorState.createWithContent(
  //   convertFromRaw(JSON.parse(singlePostData?.post?.body)),
  //   decorator,
  // );

  const FindUser = singlePostData?.post?.user?.username;
  const slicePost = data?.posts?.slice(0, 3);

  const tag = singlePostData?.post?.tags?.name?.split('%20');

  const tags = tag?.splice(0, tag?.length - 1);

  return (
    <PostPageTap>
      <Banner />
      <div>
        <Header getUser={getUser} loading={loading} logoutButton={logoutButton} />

        <div className="sticky-wrapper">
          <div className="like-button-wrapper">
            <PostLike
              height={height}
              LikehandleSubmit={LikehandleSubmit}
              isLikeBoolean={isLikeBoolean}
              UnlikehandleSubmit={UnlikehandleSubmit}
            />
          </div>
        </div>

        <div className="sticky-wrapper">
          <div className="card-wrapper">
            <Face
              height={height}
              username={FindUser}
              followHandleSubmit={followHandleSubmit}
              error={error}
              unFollowHandleSubmit={unFollowHandleSubmit}
              unfollowError={unfollowError}
              BooleanIsFollowing={BooleanIsFollowing}
            />
          </div>
        </div>

        {/* <ReactMarkdown
            className="mb-4 prose lg:prose-lg dark:prose-dark"
            escapeHtml={false}
            source={post.body}
            renderers={{ code: CodeBlock }}
          /> */}

        {/* <div dangerouslySetInnerHTML={{ __html: post.body }} />
      <textarea disabled value={draftToHtml(JSON.parse(post.body))} /> */}

        <div className="w-768 mx-auto mt-32 mmd:w-full ">
          {singlePostLoding && (
            <>
              <h2>
                <SkeletonTexts wordLengths={[3]} />
              </h2>
              <PostCardListSkeleton />
            </>
          )}
        </div>
        <PostWrapper>
          <PostHeader>
            <BlogWrapper className="flex   justify-between">
              <BlogHeader>Blog</BlogHeader>
              {userData?.me?.id === findData?.user?.id ? (
                <section className="flex   z-10">
                  <Link href={`/write/${findId}`} passHref>
                    <a>
                      <div onClick={getPostData} className="mr-2">
                        수정
                      </div>
                    </a>
                  </Link>
                  <div
                    className="cursor-pointer"
                    onClick={e => DeletePostSubmit(e, findId)}>
                    삭제
                  </div>
                </section>
              ) : (
                ''
              )}
            </BlogWrapper>
            <BlogTitle>{!singlePostLoding && singlePostData?.post?.title}</BlogTitle>
            <div className="flex flex-wrap">
              {tags?.map(ele => (
                <TagBlock key={ele}>{ele}</TagBlock>
              ))}
            </div>
            <BlogDate>
              <Moment format="YYYY/MM/DD">
                {!singlePostLoding && singlePostData?.post?.created_at}
              </Moment>
            </BlogDate>
          </PostHeader>
        </PostWrapper>
        <EditorWrapper>
          {!singlePostLoding && (
            <Editor
              /* @ts-ignore */
              editorState={EditorState.createWithContent(
                convertFromRaw(JSON.parse(singlePostData?.post?.body)),
                decorator,
              )}
              readonly
              customStyleMap={styleMap}
            />
          )}
        </EditorWrapper>

        <div className="comments-wrapper  ">
          <div className="comments-text-wrapper ">
            <div
              className="comments-count   flex items-center   w-full
             ">
              {!commentsLoading && getComments.length} 개의 댓글
              <div className="flex  items-center  justify-end  ml-6">
                {getIsAuth == 'resolved' ? (
                  <>
                    <LikeVisible>
                      {isLikeBoolean ? (
                        <TiHeart onClick={UnlikehandleSubmit} size="20" />
                      ) : (
                        <TiHeartOutline onClick={LikehandleSubmit} size="20" />
                      )}
                    </LikeVisible>
                    <div className="follow-visible ml-2">
                      {BooleanIsFollowing ? (
                        <AiOutlineUserDelete onClick={unFollowHandleSubmit} size="20" />
                      ) : (
                        <AiOutlineUserAdd onClick={followHandleSubmit} size="20" />
                      )}
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <CommentForm
            findId={findId}
            handleSubmit={handleSubmit}
            getText={getText}
            textOnChange={textOnChange}
            userData={userData}
            onClickNotify={onClickNotify}
            onClickNotifyCheckString={onClickNotifyCheckString}
          />

          {!commentsLoading &&
            getComments.map((el, id) => (
              <>
                <div key={id}>
                  <Comments
                    el={el}
                    editComment={editComment}
                    editText={editText}
                    editCommentInput={editCommentInput}
                    toggle={toggle}
                    on={on}
                    EditCommentSubmit={EditCommentSubmit}
                    fixComment={fixComment}
                    DeleteCommentSubmit={DeleteCommentSubmit}
                    setIsopen={setIsopen}
                    userData={userData}
                    onClickNotifyCheckString={onClickNotifyCheckString}
                  />
                </div>

                {el.id == isOpen && on ? (
                  <>
                    <SubCommentsForm
                      userData={userData}
                      subHandleSubmit={subHandleSubmit}
                      findData={findData}
                      onClickNotify={onClickNotify}
                      isOpen={isOpen}
                      on={on}
                      toggle={toggle}
                      onClickNotifyCheckString={onClickNotifyCheckString}
                    />
                  </>
                ) : (
                  ''
                )}
                {getComments.map((ele, id) => (
                  <>
                    <SubComments
                      ele={ele}
                      el={el}
                      subEditText={subEditText}
                      editSubCommentInput={editSubCommentInput}
                      EditCommentSubmit={EditCommentSubmit}
                      DeleteCommentSubmit={DeleteCommentSubmit}
                      userData={userData}
                      findData={findData}
                      onClickNotifyCheckString={onClickNotifyCheckString}
                    />
                  </>
                ))}
              </>
            ))}
        </div>
      </div>

      <div>
        <RelatedPost posts={slicePost} PostsLoading={PostsLoading} />
      </div>

      <Footer />
    </PostPageTap>
  );
}

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter style={style} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

// const MarkdownImage = ({ alt, src }) => (
//   <Image
//     alt={alt}
//     src={require(`../../content/assets/${src}`)}
//     webpSrc={require(`../../content/assets/${src}?webp`)}
//     previewSrc={require(`../../content/assets/${src}?lqip`)}
//     className="w-full"
//   />
// );

// export async function getServerSideProps(context) {
//   if (context.query.id && typeof context.query.id === 'string') {
//     const { id } = context.query;

//     const apolloClient = initializeApollo();

//     const postData = await apolloClient.query({
//       query: GET_Post,
//       variables: { id: id },
//     });

//     const postsData = await apolloClient.query({
//       query: GET_Posts,
//     });

//     return { props: { post: postData?.data?.post || null, posts: postsData.data.posts } };
//   }
// }
function PostCardListSkeleton({ hideUser, forLoading }: PostCardListSkeletonProps) {
  return (
    <div>
      {Array.from({ length: forLoading ? 1 : 6 }).map((_, i) => (
        <PostCardSkeleton hideUser={true} key={i} />
      ))}
    </div>
  );
}

export type PostCardListSkeletonProps = {
  hideUser?: boolean;
  forLoading?: boolean;
};

const Separator = styled.div``;

export type PostCardSkeletonProps = {
  hideUser?: boolean;
};

export function PostCardSkeleton({ hideUser }: PostCardSkeletonProps) {
  return (
    <SkeletonBlock>
      {!hideUser && (
        <div className="user-info">
          <Skeleton className="user-thumbnail-skeleton" circle marginRight="1rem" />
          <div className="username">
            <Skeleton width="5rem" />
          </div>
        </div>
      )}

      <div className="short-description">
        <div className="line">
          <SkeletonTexts wordLengths={[2, 4, 3, 6, 2, 7]} useFlex />
        </div>
        <div className="line">
          <SkeletonTexts wordLengths={[3, 2, 3, 4, 7, 3]} useFlex />
        </div>
        <div className="line">
          <SkeletonTexts wordLengths={[4, 3, 3]} />
        </div>
      </div>
    </SkeletonBlock>
  );
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   const apolloClient = initializeApollo();

//   const postData = await apolloClient.query({
//     query: GET_Posts,
//   });

//   const { req, res } = context;

//   res.setHeader('Cache-Control', `s-maxage=60, stale-while-revalidate`);

//   const a = context.req.cookies;

//   return {
//     props: { a },
//   };
// };

const LikeVisible = styled.div`
  display: none;
  ${media.custom(1900)} {
    display: unset;
  }
`;

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 15,
    margin: 10,
    display: 'flex',
    whiteSpace: 'pre-line',
    lineBreak: 'strict',
  },
  BOLD: {
    color: '#1fb6ff',
    fontWeight: 'bold',
  },
  ANYCUSTOMSTYLE: {
    color: '#00e400',
  },
  FANCYBLOCKQUOTE: {
    color: '#999',
    fontStyle: 'italic',
    fontFamily: `'Hoefler Text', Georgia, serif`,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  H1: {
    fontSize: '2rem',
  },
  H2: {
    fontSize: '1.5rem',
  },
  H3: {
    fontSize: '1.7rem',
  },
};
const BlogHeader = styled.div`
  font-size: 1rem;
  color: #8492a6;
`;

const BlogTitle = styled.div`
  font-size: 2.375rem;
  color: #1f2d3d;
  font-weight: 600;
`;

const BlogDate = styled.div`
  font-size: 1.125rem;
  color: #3c4858;
  font-weight: 600;
`;

const TagBlock = styled.div`
  background-color: #1fb6ff;
  margin-bottom: 0.875rem;
  color: #fff;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2rem;
  border-radius: 1rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
  margin-right: 0.875rem;

  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  ${media.custom(768)} {
    height: 1.5rem;
    font-size: 0.75rem;
    border-radius: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const PostHeader = styled.div`
  width: 768px;
  margin: 0 auto;
  ${media.custom(1024)} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  ${media.custom(768)} {
    width: 100%;
  }
  height: 14rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostWrapper = styled.div`
  margin: 5rem 0;
  height: 14rem;
`;

const EditorWrapper = styled.div`
  width: 768px;
  margin: 0 auto;
  ${media.custom(1024)} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  ${media.custom(768)} {
    width: 100%;
  }
  span {
    line-height: 2.125rem;
    letter-spacing: -0.004em;
    word-break: keep-all;
    font-size: 1.25rem;
    -webkit-font-smoothing: antialiased;
    overflow-wrap: break-word;
    font-weight: 300;
    font-family: Graphik, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif !important;
  }
`;

const BlogWrapper = styled.div`
  & > section {
    justify-content: flex-end;
  }
`;

const PostPageTap = styled.div`
  .card-wrapper {
    width: 50%;
    right: 0;
    z-index: -999;
    position: absolute;
  }
  .like-button-wrapper {
    position: absolute;
    left: 20%;
    margin-top: 8%;
  }
  .sticky-wrapper {
    position: sticky;
    top: 0;
  }
  .comments-count {
    font-size: 1.125rem;
    font-weight: 600;
    color: #343a40;
    margin-bottom: 1rem;
  }
  .dataFormat {
    border-bottom: 2px solid transparent;
    border-top: 2px solid transparent;
    font-size: 1rem;
    line-height: 1.5;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.04em !important;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif;
    color: rgba(38, 38, 38, 0.66);
  }
  .intro-wrapper {
    margin: 1rem 0;
    line-height: 1.6;
  }
  .comments-wrapper {
    width: 768px;
    margin: 0 auto;
    ${media.custom(1024)} {
      padding-left: 1rem;
      padding-right: 1rem;
      margin-top: 8rem;
    }

    ${media.custom(768)} {
      width: 100%;
      margin-top: 4rem;
    }

    margin-top: 16rem;
  }
  .comments-text-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .comments-edit {
    display: flex;
    cursor: pointer;
    & div {
      margin-right: 1rem;
    }
  }
  .comments-layout {
    color: rgb(33, 37, 41);
    z-index: 10;

    border: 1px solid rgb(33, 37, 41);
    border-color: rgb(233, 236, 239);
    border-radius: 4px;
    padding: 1rem;
  }
  .comments-text {
    padding-top: 1rem;
    white-space: pre-line;
  }
  .comment-write-button {
    display: flex;
    justify-content: space-between;

    align-items: center;
    color: rgb(134, 142, 150);
    margin-top: 1rem;
  }
  .commentsInput {
    margin-bottom: 1.5rem;
    width: 100%;
    font-size: 1rem;
    z-index: 10;

    color: rgb(33, 37, 41);
    line-height: 1.75;
    padding: 1rem 1rem 1.5rem;
    outline: none;
    border-width: 1px;

    border-style: solid;
    border-color: rgb(233, 236, 239);
    border-image: initial;
    border-radius: 4px;
  }

  .subcomments-wrapper {
    display: flex;
    justify-content: flex-end;
    flex-wrap: nowrap;

    text-align: left;

    color: rgb(52, 58, 64);
  }
  .comments-edit-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-right: 0.5rem;
    & div {
      margin-right: 1rem;
    }
  }
  .edit-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    & div {
      margin-right: 0.4rem;
    }
  }
  .tag {
    margin-bottom: 0.875rem;
    background: rgb(241, 243, 245);
    padding-left: 1rem;
    padding-right: 1rem;
    height: 2rem;
    border-radius: 1rem;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    margin-right: 0.875rem;
    color: rgb(12, 166, 120);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
  }
  .comments-mini {
    display: flex;
    align-items: center;
  }
  .follow-visible {
    display: none;
    ${media.custom(1900)} {
      display: unset;
    }
  }
`;
const Title = styled.div`
  word-wrap: break-word;
  font-size: 48px;
  margin-bottom: 25px;
  font-weight: 800;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif;
  letter-spacing: -0.022em;
  line-height: 1.35;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  ${media.custom(1000)} {
    font-size: 36px;
  }
`;

const PostCardBlock = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  ${media.custom(768)} {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }
  &:first-child {
    padding-top: 0;
  }
  .user-info {
    display: flex;
    align-items: center;
    img {
      width: 3rem;
      height: 3rem;
      display: block;
      margin-right: 1rem;
      background: '#F8F9FA';
      object-fit: cover;
      border-radius: 1.5rem;
      box-shadow: 0px 0 8px rgba(0, 0, 0, 0.1);
      ${media.custom(768)} {
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
      }
    }
    .username {
      font-size: 0.875rem;
      color: #212529;
      font-weight: bold;
      a {
        color: inherit;
        text-decoration: none;
        &:hover {
          color: #343a40;
        }
      }
    }
    margin-bottom: 1.5rem;
    ${media.custom(768)} {
      margin-bottom: 0.75rem;
    }
  }
  .post-thumbnail {
    margin-bottom: 1rem;
  }
  line-height: 1.5;
  h2 {
    font-size: 1.5rem;
    margin: 0;
    color: #212529;
    word-break: keep-all;
    ${media.custom(768)} {
      font-size: 1rem;
    }
  }
  p {
    margin-bottom: 2rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #495057;
    word-break: keep-all;
    overflow-wrap: break-word;
    ${media.custom(768)} {
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }
  }
  .subinfo {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    color: #868e96;
    font-size: 0.875rem;
    ${media.custom(768)} {
      font-size: 0.75rem;
    }
    span {
    }
    .separator {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
  .tags-wrapper {
    margin-bottom: -0.875rem;
    ${media.custom(768)} {
      margin-bottom: -0.5rem;
    }
  }

  & + & {
  }
`;

const SkeletonBlock = styled(PostCardBlock)`
  h2 {
    display: flex;
    margin-top: 1.375rem;
    margin-bottom: 0.375rem;
  }
  .user-thumbnail-skeleton {
    width: 3rem;
    height: 3rem;
    ${media.custom(768)} {
      width: 2rem;
      height: 2rem;
    }
  }
  .thumbnail-skeleton-wrapper {
    width: 100%;
    padding-top: 52.35%;
    position: relative;
    .skeleton {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .short-description {
    font-size: 1rem;
    .line {
      display: flex;
    }
    .line + .line {
      margin-top: 0.5rem;
    }
  }
  .tags-skeleton {
    line-height: 1;
    font-size: 2rem;
    ${media.custom(768)} {
      font-size: 1.25rem;
    }
  }
`;
