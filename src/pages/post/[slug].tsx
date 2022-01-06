import Link from 'next/link';
import ReactMarkdown from 'react-markdown/with-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
import { Image } from '../../components/Common/Image';
import { initializeApollo } from '../../lib/apolloClient';
import { GET_Posts } from '../../lib/graphql/posts';
import draftToHtml from 'draftjs-to-html';

import { useState } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkDecorator from '../../components/Write/Decorators';

export default function Post({ post, frontmatter, nextPost, previousPost }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  console.log(JSON.parse(post.body));
  const decorator = createLinkDecorator();

  const defaultEditorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(post.body)),
    decorator,
  );

  return (
    <>
      {/* <div>
        <article>
          <header className="mb-8">
            <h1
              className="mb-2 text-5xl font-black leading-none font-display"
              style={{ paddingBottom: '1rem' }}></h1>
          </header>
          <ReactMarkdown
            className="mb-4 prose lg:prose-lg dark:prose-dark"
            escapeHtml={false}
            source={post.body}
            renderers={{ code: CodeBlock }}
          />

          <hr className="mt-4" />
          <footer></footer>
        </article>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
      <textarea disabled value={draftToHtml(JSON.parse(post.body))} /> */}

      <Editor editorState={defaultEditorState} readonly customStyleMap={styleMap} />
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
    padding: 4,
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
