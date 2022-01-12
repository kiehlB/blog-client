import Link from 'next/link';
import ReactMarkdown from 'react-markdown/with-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
import { Image } from '../../components/Common/Image';
import { initializeApollo } from '../../lib/apolloClient';
import { GET_Posts } from '../../lib/graphql/posts';
import draftToHtml from 'draftjs-to-html';
import styled from 'styled-components';
import { useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkDecorator from '../../components/Write/Decorators';
import Header from '../../components/Base/Header';
import Banner from '../../components/Banner';

export default function Post({ post, frontmatter, nextPost, previousPost }) {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(post.body))),
  );

  const decorator = createLinkDecorator();

  const defaultEditorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(post.body)),
    decorator,
  );

  console.log(defaultEditorState);

  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  const value = blocks
    .map(block => (!block.text.trim() && '\n') || block.text)
    .join('\n');

  console.log(post);

  return (
    <>
      <Banner />
      <Header />

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
        <Editor editorState={defaultEditorState} readonly customStyleMap={styleMap} />
      </EditorWrapper>
    </>
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

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const postData = await apolloClient.query({
    query: GET_Posts,
  });

  return { props: { post: postData.data.posts[0] } };
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
