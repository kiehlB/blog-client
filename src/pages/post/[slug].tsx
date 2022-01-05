import Link from 'next/link';
import ReactMarkdown from 'react-markdown/with-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
import { Image } from '../../components/Common/Image';
import { initializeApollo } from '../../lib/apolloClient';
import { GET_Posts } from '../../lib/graphql/posts';

export default function Post({ post, frontmatter, nextPost, previousPost }) {
  console.log(post);
  return (
    <>
      <div>
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
      <h1>hello h1</h1>
      <h2>hello h2</h2>
      <h3>hello h3</h3>
      <p>im red</p>
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
