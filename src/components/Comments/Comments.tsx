import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { MeQuery } from '../../types/apolloComponent';
import { checkEmpty } from '../../utils/isNull';
import TextareaAutosize from 'react-textarea-autosize';
import Moment from 'react-moment';
import media from '../../lib/styles/media';

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
        <C>
          <div className="comments-layout">
            <div className="flex items-center">
              <img
                src="https://secure.gravatar.com/avatar/ceb84f6559c4206c1a588e0e31c0a048?s=22&d=mm&r=g"
                style={{ borderRadius: '50%', marginRight: '.5rem' }}
              />
              <div>{props.el.user?.username}</div>

              <Dot className="color-base-30 px-2 m:pl-0" role="presentation">
                •
              </Dot>

              <CommentMoment>
                <Moment fromNow>{props.el.created_at}</Moment>
              </CommentMoment>
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
        </C>
      )}
    </>
  );
}

export default Comments;

const CommentMoment = styled.div`
  font-size: 0.875rem;
  color: #575757;
  ${media.custom(319)} {
    display: none;
  }
`;

const Dot = styled.div`
  font-size: 1rem;
  color: #dbdbdb;
`;

const C = styled.div``;
