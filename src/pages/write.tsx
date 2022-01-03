import styled from 'styled-components';
import QuillEditor from '../components/Write';

export type WriteProps = {};

function Write({}: WriteProps) {
  const isBrowser = typeof window !== 'undefined';

  return <WriteBlock>{isBrowser ? <QuillEditor /> : null}</WriteBlock>;
}

const WriteBlock = styled.div``;

export default Write;
