import React, { useState } from 'react';
import styled from 'styled-components';
import { MeQuery } from '../../types/apolloComponent';
import { checkEmpty } from '../../utils/isNull';
import Button from '../Common/TailButton';
import TextareaAutosize from 'react-textarea-autosize';

const SubCommentsFormTap = styled.div`
  .button-flex {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    margin-bottom: 1rem;
  }
`;

export type SubCommentsFormProps = {
  userData: MeQuery;
  subHandleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    findId: string,
    SubText: string,
  ) => Promise<void>;
  findData: any;
  onClickNotify: (e: React.FormEvent<HTMLFormElement>) => void;
  isOpen: string;
  on: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  onClickNotifyCheckString: (e: React.FormEvent<HTMLFormElement>) => void;
};

function SubCommentsForm(props: SubCommentsFormProps) {
  const [SubText, setSubText] = useState('');

  const subTextOnChange = e => {
    setSubText(e.target.value);
  };

  return (
    <SubCommentsFormTap>
      <form
        onSubmit={e => {
          props.userData.me ? e.preventDefault() : props.onClickNotify(e);
          checkEmpty(SubText)
            ? props.onClickNotifyCheckString(e)
            : props.subHandleSubmit(e, props.findData.id, SubText);
          props.userData.me ? setSubText('') : '';
        }}>
        <TextareaAutosize
          rows={4}
          className="commentsInput"
          placeholder="댓글을 입력하세요"
          name="text"
          value={SubText}
          onChange={subTextOnChange}
        />
        <div className="button-flex">
          <Button className=" text-white bg-regal-sky">댓글 작성</Button>
        </div>
      </form>
    </SubCommentsFormTap>
  );
}

export default SubCommentsForm;
