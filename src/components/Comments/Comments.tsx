import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { MeQuery } from '../../types/apolloComponent';
import { checkEmpty } from '../../utils/isNull';
import TextareaAutosize from 'react-textarea-autosize';
const CommentsTap = styled.div``;

export type CommentsProps = {
  el: any;
  editComment: boolean;
  editText: string;
  editCommentInput: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsopen: React.Dispatch<React.SetStateAction<string>>;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  on: boolean;
  EditCommentSubmit: (e: any, commentId: string, text: string) => Promise<void>;
  fixComment: () => void;
  DeleteCommentSubmit: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    commentId: string,
  ) => Promise<void>;
  userData: MeQuery;
  onClickNotifyCheckString: (e: any) => void;
};

function Comments(props: CommentsProps) {
  const [editComment, setEditComment] = useState(false);
  const [editSubComment, setEditSubComment] = useState(false);
  const [editText, setEditText] = useState('');

  const editCommentInput = e => {
    setEditText(e.target.value);
  };

  const fixComment = () => {
    setEditComment(!editComment);
    setEditText(props.el.text);
  };

  const fixSubComment = () => {
    setEditSubComment(!editSubComment);
  };

  return (
    <>
      {props.el.reply ? (
        ''
      ) : (
        <div>
          <div className="comments-layout">
            <div className="flex ">
              <img
                src="https://secure.gravatar.com/avatar/ceb84f6559c4206c1a588e0e31c0a048?s=22&d=mm&r=g"
                style={{ borderRadius: '50%', marginRight: '.5rem' }}
              />
              {props.el.user?.username}
            </div>
            <div className="comments-text">
              {editComment ? (
                <form
                  onSubmit={e => {
                    checkEmpty(editText)
                      ? props.onClickNotifyCheckString(e)
                      : props.EditCommentSubmit(e, props.el.id, editText);
                    checkEmpty(editText) ? e.preventDefault() : fixComment();
                  }}>
                  <TextareaAutosize
                    className="w-full"
                    rows={4}
                    name="text"
                    value={editText}
                    onChange={editCommentInput}
                  />
                </form>
              ) : (
                props.el.text
              )}
            </div>

            <div className="comment-write-button">
              <div className="edit-button">
                <IoIosAddCircleOutline
                  style={{ marginRight: '.2rem' }}
                  onClick={() => {
                    props.setIsopen(props.el.id);
                    props.toggle(!props.on);
                  }}
                />
                <div
                  onClick={() => {
                    props.setIsopen(props.el.id);
                    props.toggle(!props.on);
                  }}>
                  댓글 작성
                </div>
              </div>

              {props.userData?.me?.id == props.el.user.id ? (
                <div className="edit-button">
                  {editComment ? (
                    <>
                      <div
                        onClick={e => {
                          checkEmpty(editText)
                            ? props.onClickNotifyCheckString(e)
                            : props.EditCommentSubmit(e, props.el.id, editText);
                          checkEmpty(editText) ? e.preventDefault() : fixComment();
                        }}>
                        수정
                      </div>
                      <div onClick={fixComment}>취소</div>
                    </>
                  ) : (
                    <div className="edit-button">
                      <div onClick={fixComment}>수정</div>
                      <div onClick={e => props.DeleteCommentSubmit(e, props.el.id)}>
                        삭제
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <RiArrowDropDownLine />
        </div>
      )}
    </>
  );
}

export default Comments;
