import styled from 'styled-components';
import Button from '../Common/TailButton';

import { useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkDecorator from '../../components/Write/Decorators';

export type PostItemProps = {
  post: any;
  hello: any;
};

function PostItem(props: PostItemProps) {
  console.log(props.post);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(props.post.body))),
  );

  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  const value = blocks
    .map(block => (!block.text.trim() && '\n') || block.text)
    .join('\n');

  const withoutThumbnail = (
    <>
      <C className="">
        {props.post?.thumbnail ? (
          <ContentImg src={props.post.thumbnail} alt="Picture of the author" />
        ) : (
          ''
        )}
        <FlexWrapper>
          <PostContent>
            <PostTitle>{props.post.title}</PostTitle>
            <ByWho>나는 어서</ByWho>
            <GG2>hello</GG2>
            <WithoutPostBody>{value}</WithoutPostBody>
          </PostContent>
          <WithoutPostButtonWrapper>
            <Button className="text-zinc-600 font-bold  text-sm  w-32 h-10">
              Read more
            </Button>
          </WithoutPostButtonWrapper>
        </FlexWrapper>
      </C>
    </>
  );

  const withThumbnail = (
    <>
      <C className="">
        {props.post?.thumbnail ? (
          <ContentImg src={props.post.thumbnail} alt="Picture of the author" />
        ) : (
          ''
        )}

        <PostContent>
          <GG>hello</GG>
          <PostTitle>{props.post.title}</PostTitle>
          <ByWho>나는 어서</ByWho>
          <PostBody>{value}</PostBody>
        </PostContent>
        <PostButtonWrapper>
          <Button className="text-zinc-600 font-bold  text-sm  w-32 h-10">
            Read more
          </Button>
        </PostButtonWrapper>
      </C>
    </>
  );

  return <>{props.post.thumbnail ? withThumbnail : withoutThumbnail}</>;
}

const PostItemBlock = styled.div``;

export default PostItem;

const C = styled.section`
  box-shadow: 0px 10px 20px rgba(34, 45, 65, 0.05), 0px 0px 2px rgba(0, 0, 0, 0.13);

  border-radius: 15px;
  transition: all 0.5s ease;

  &: hover {
    box-shadow: 0 5px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-15px);
    cursor: pointer;
    opacity: 1;
  }
`;

const ContentImg = styled.img`
  width: 100%;

  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const PostContent = styled.section<{
  hello: boolean;
}>`
  margin-top: 2.5rem;
  padding: 0rem 1.5rem;
 
`;

const FlexWrapper = styled.section<{
  hello: boolean;
}>`
   display: flex;
  flex-direction: column;
  height:100%;
  justify-content: space-between;
   
`;

const WithoutPostBody = styled.section`
  line-height: 24px;
  color: #3c4858;
  font-weight: 300;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  max-height: 20.4375rem;
  display: -webkit-box;
    
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: initial;
    word-wrap: break-word;
    overflow: hidden;

`;

const GG = styled.section<{
  hello: boolean;
}>`
  position: absolute;
  margin: -3.2rem -0px;
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
`;

const GG2 = styled.section<{
  hello: boolean;
}>`
  
  margin-top:1rem;
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
`;

const PostTitle = styled.section`
  font-size: 1.625rem;
  line-height: 2.125rem;
  color: #1f2d2d;
  display: -webkit-box;
    
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: initial;
    word-wrap: break-word;
    overflow: hidden;
  max-height:6.375rem;
 
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
  margin-bottom: 2rem;
  padding: 0rem 1.5rem;
`;
const WithoutPostButtonWrapper = styled.section`
  
  padding: 1.5rem 1.5rem;
`;
