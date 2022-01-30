import React, { useState } from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import { MeQuery } from '../../types/apolloComponent';
import { checkEmpty } from '../../utils/isNull';
import Button from '../Common/TailButton';
import TextareaAutosize from 'react-textarea-autosize';

const CommentFormTap = styled.div`
  width: 100%;

  .button-flex {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    margin-bottom: 1rem;
  }
  .commentsInput {
    width: 100%;
  }
`;

export type CommentFormProps = {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    findId: React.FormEvent<HTMLFormElement>,
    test: string,
  ) => void;
  getText: string;
  textOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  findId: React.FormEvent<HTMLFormElement>;
  userData: MeQuery;
  onClickNotify: (e: any) => void;
  onClickNotifyCheckString: (e: React.FormEvent<HTMLFormElement>) => void;
};

function CommentForm(props: CommentFormProps) {
  const [Text, setText] = useState('');

  const textOnChange = e => {
    setText(e.target.value);
  };

  return (
    <CommentFormTap className="z-10">
      <form
        className="z-10"
        onSubmit={e => {
          props.userData.me ? e.preventDefault() : props.onClickNotify(e);
          checkEmpty(Text)
            ? props.onClickNotifyCheckString(e)
            : props.handleSubmit(e, props.findId, Text);
          props.userData.me ? setText('') : '';
        }}>
        <div className="z-10">
          <TextareaAutosize
            rows={4}
            defaultValue="댓글을 입력하세요"
            className="commentsInput"
            value={Text}
            onChange={textOnChange}
          />
        </div>
        <div className="button-flex">
          <Button className="ml-8 cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-base font-bold text-white bg-regal-sky">
            댓글 작성
          </Button>
        </div>
      </form>
    </CommentFormTap>
  );
}

export default CommentForm;
