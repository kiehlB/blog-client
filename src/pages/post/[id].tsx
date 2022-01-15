import Link from 'next/link';
import ReactMarkdown from 'react-markdown/with-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
import { Image } from '../../components/Common/Image';
import { initializeApollo } from '../../lib/apolloClient';
import { GET_Post, GET_Posts } from '../../lib/graphql/posts';
import draftToHtml from 'draftjs-to-html';
import styled from 'styled-components';
import { useState } from 'react';
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

export default function Post({ post, frontmatter, nextPost, previousPost }) {
  const dispatch = useDispatch();
  const [isInput, setisInput] = useState(false);
  const getPost = useSelector((state: RootState) => state.post);
  const { getUser: userData, loading: userLoding } = useGetUser();
  const { singlePostLoding, singlePostError, singlePostData } = useGetPost();
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

  if (commentsLoading) return <p>Loading...</p>;
  if (commentsError) return <p>Error !!!!!!!!!!:(</p>;

  const getComments = commentstData.comment.filter(el => el.post_id == router.query.id);

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

  const defaultEditorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(post.body)),
    decorator,
  );

  const FindUser = post?.user?.username;
  return (
    <PostPageTap>
      <Banner />
      <Header />
      <div className="sticky-wrapper">
        <div className="like-button-wrapper">
          <PostLike
            LikehandleSubmit={LikehandleSubmit}
            isLikeBoolean={isLikeBoolean}
            UnlikehandleSubmit={UnlikehandleSubmit}
          />
        </div>
      </div>

      <div className="sticky-wrapper">
        <div className="card-wrapper">
          <Face
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

      <PostWrapper>
        <PostHeader>
          <BlogHeader>Blog</BlogHeader>
          <BlogTitle>im title</BlogTitle>
          <BlogDate>date</BlogDate>
        </PostHeader>
      </PostWrapper>
      <EditorWrapper>
        {/* @ts-ignore */}
        <Editor editorState={defaultEditorState} readonly customStyleMap={styleMap} />
      </EditorWrapper>

      <div className="comments-wrapper">
        <div className="comments-text-wrapper">
          <div className="comments-mini">
            <div className="comments-count">{getComments.length} 개의 댓글</div>
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

        {getComments.map((el, id) => (
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

export async function getServerSideProps(context) {
  if (context.query.id && typeof context.query.id === 'string') {
    const { id } = context.query;

    const apolloClient = initializeApollo();

    const postData = await apolloClient.query({
      query: GET_Post,
      variables: { id: id },
    });

    return { props: { post: postData?.data?.post || null } };
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
  },
  BOLD: {
    color: '#395296',
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
    width: '100%',
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

const PostHeader = styled.div`
  margin: 0 auto;
  width: 40%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostWrapper = styled.div`
  margin: 5rem 0;
  height: 10rem;
`;

const EditorWrapper = styled.div`
  margin: 0 auto;
  width: 40%;
`;

const PostPageTap = styled.div`
  .card-wrapper {
    width: 50%;
    right: 0;
    margin: 0 auto;
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
    width: 40%;
    margin: 0 auto;
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

    & div {
      margin-right: 0.4rem;
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

const LikeVisible = styled.div`
  display: none;
  ${media.custom(1900)} {
    display: unset;
  }
`;
