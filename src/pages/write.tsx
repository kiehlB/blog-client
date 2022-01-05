import styled from 'styled-components';
import EditorMain from '../components/Write';

export type WriteProps = {};

function Write({}: WriteProps) {
  return (
    <WriteBlock>
      <EditorMain />
    </WriteBlock>
  );
}

const WriteBlock = styled.div``;

export default Write;
