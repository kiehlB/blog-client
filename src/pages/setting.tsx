import styled from 'styled-components';
import { Editor } from '../components/Draftail';

export type SettingProps = {};

function Setting({}: SettingProps) {
  return (
    <SettingBlock>
      <div>hello</div>
    </SettingBlock>
  );
}

const SettingBlock = styled.div`
  height: 100%;
`;

export default Setting;
