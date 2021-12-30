import styled from 'styled-components';

export type PostProps = {};

function Post({}: PostProps) {
  return (
    <PostBlock>
      <div>snippet</div>
    </PostBlock>
  );
}

const PostBlock = styled.div``;

export default Post;
