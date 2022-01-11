import Link from 'next/link';
import ReactMarkdown from 'react-markdown/with-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
import { Image } from '../../components/Common/Image';
import { initializeApollo } from '../../lib/apolloClient';
import { GET_Posts } from '../../lib/graphql/posts';
import draftToHtml from 'draftjs-to-html';

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

  console.log(value);

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

      <div style={{ margin: '0 auto', width: '40%', border: '1px solid red' }}>
        <div>title</div>
        <div>date</div>

        <Editor editorState={defaultEditorState} readonly customStyleMap={styleMap} />
      </div>
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
    border: '1px solid red',
    padding: 4,
    display: 'flex',
    justifyContent: 'center',
  },
  BOLD: {
    color: '#395296',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
  },
  ANYCUSTOMSTYLE: {
    color: '#00e400',
    display: 'flex',
    justifyContent: 'center',
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
    display: 'flex',
    justifyContent: 'center',
  },
  H2: {
    fontSize: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  H3: {
    fontSize: '1.7rem',
    display: 'flex',
    justifyContent: 'center',
  },
};
