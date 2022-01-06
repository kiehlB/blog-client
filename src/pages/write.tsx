import styled from 'styled-components';
import EditorMain from '../components/Write';

export type WriteProps = {};

function Write({}: WriteProps) {
  return (
    <WriteBlock>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
      <EditorMain />
    </WriteBlock>
  );
}

const WriteBlock = styled.div`
  height: 100%;
`;

export default Write;
