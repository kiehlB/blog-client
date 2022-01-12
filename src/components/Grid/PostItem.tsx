import styled from 'styled-components';
import Button from '../Common/TailButton';

import { useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkDecorator from '../../components/Write/Decorators';

export type PostItemProps = {
  post: any;
};

function PostItem({ post }: PostItemProps) {
  console.log(post);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(post.body))),
  );

  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  const value = blocks
    .map(block => (!block.text.trim() && '\n') || block.text)
    .join('\n');

  return (
    <C className="border border-black">
      {post?.thumbnail ? (
        <ContentImg src={post.thumbnail} alt="Picture of the author" />
      ) : (
        ''
      )}

      <PostContent>
        <PostTitle>{post.title}</PostTitle>
        <ByWho>나는 어서</ByWho>
        <PostBody>{value}</PostBody>
      </PostContent>
      <PostButtonWrapper>
        <Button className="text-zinc-600 font-bold  text-sm  w-32 h-10">Read more</Button>
      </PostButtonWrapper>
    </C>
  );
}

const PostItemBlock = styled.div``;

export default PostItem;

const C = styled.section``;

const ContentImg = styled.img`
  width: 100%;
`;

const PostContent = styled.section`
  margin-top: 2.5rem;
  padding: 0rem 1.5rem;

  &::before {
    content: 'Read this';
    position: absolute;
    margin: -3.5rem -0px;
    width: 8rem;
    height: 1.375rem;
    background-color: #1fb6ff;
    line-height: 22px;
    font-size: 12px;
    font-weight: 500;
    padding: 0px 5px 0px 5px;
    color: white;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PostTitle = styled.section`
  font-size: 1.625rem;
  line-height: 2.125rem;
  color: #1f2d2d;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ByWho = styled.section`
  font-size: 1rem;
  line-height: 1.5rem;
  color: #3c4858;

  margin-top: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostBody = styled.section`
  line-height: 24px;
  color: #3c4858;
  font-weight: 300;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  height: 6rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostButtonWrapper = styled.section`
  margin: 1.5rem 0;
  padding: 0rem 1.5rem;
`;
