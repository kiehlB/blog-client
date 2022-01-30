import React, { useState } from 'react';

import styled from 'styled-components';
import { MeQuery } from '../../types/apolloComponent';
import { checkEmpty } from '../../utils/isNull';
import TextareaAutosize from 'react-textarea-autosize';
import Moment from 'react-moment';
import media from '../../lib/styles/media';

const SubCommentsTap = styled.div`
  width: 90%;

  margin-left: 10%;

  font-size: 1rem;
  color: rgb(33, 37, 41);
  margin-bottom: 1rem;
  border: 1px solid rgb(33, 37, 41);
  border-color: rgb(233, 236, 239);
  border-radius: 4px;
  padding: 0;
  .sub-color {
    color: rgb(134, 142, 150);
    z-index: 10;
  }
  .comments-edit-wrapper {
    cursor: pointer;
  }
`;

export type SubCommentsProps = {
  ele: any;
  el: any;
  subEditText: string;
  editSubCommentInput: (e: any) => void;
  EditCommentSubmit: (e: any, commentId: string, text: string) => Promise<void>;
  DeleteCommentSubmit: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    commentId: string,
  ) => Promise<void>;
  userData: MeQuery;
  findData: any;
  onClickNotifyCheckString: (e: any) => void;
};

function SubComments(props: SubCommentsProps) {
  const [editSubComment, setEditSubComment] = useState(false);
  const [subEditText, subSetEditText] = useState('');

  const editSubCommentInput = e => {
    subSetEditText(e.target.value);
  };

  const fixSubComment = () => {
    setEditSubComment(!editSubComment);
    subSetEditText(props.ele.text);
  };

  return (
    <>
      <div>
        {props.ele.reply && props.el.id == props.ele.reply ? (
          <div className="subcomments-wrapper ">
            <SubCommentsTap>
              <div className="flex mt-4  ml-4">
                <img
                  src="https://secure.gravatar.com/avatar/ceb84f6559c4206c1a588e0e31c0a048?s=22&d=mm&r=g"
                  style={{ borderRadius: '50%', marginRight: '.5rem' }}
                />
                {props.el.user?.username}
                <Dot className="color-base-30 px-2 m:pl-0" role="presentation">
                  •
                </Dot>

                <CommentMoment>
                  <Moment fromNow>{props.el.created_at}</Moment>
                </CommentMoment>
              </div>
              {editSubComment ? (
                <div>
                  <form
                    onSubmit={e => {
                      checkEmpty(subEditText)
                        ? props.onClickNotifyCheckString(e)
                        : props.EditCommentSubmit(e, props.ele.id, subEditText);

                      checkEmpty(subEditText) ? e.preventDefault() : fixSubComment();
                    }}>
                    <div className=" pt-4">
                      <TextareaAutosize
                        rows={4}
                        name="text"
                        value={subEditText}
                        className="w-full   px-4"
                        onChange={editSubCommentInput}
                      />
                    </div>
                  </form>
                  <div className="comments-edit-wrapper">
                    <div
                      onClick={e => {
                        checkEmpty(subEditText)
                          ? props.onClickNotifyCheckString(e)
                          : props.EditCommentSubmit(e, props.ele.id, subEditText);

                        checkEmpty(subEditText) ? e.preventDefault() : fixSubComment();
                      }}
                      className="sub-color"
                      style={{ paddingBottom: '.5rem' }}>
                      수정
                    </div>
                    <div className="sub-color" onClick={fixSubComment}>
                      취소
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-4">
                  <div className="ml-4" style={{ whiteSpace: 'pre-line' }}>
                    {props.ele.text}
                  </div>
                  {props.userData?.me?.id == props.ele.user.id ? (
                    <div className="comments-edit-wrapper">
                      <div onClick={fixSubComment} className="sub-color">
                        수정
                      </div>
                      <div
                        className="sub-color"
                        onClick={e => props.DeleteCommentSubmit(e, props.ele.id)}>
                        삭제
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )}
            </SubCommentsTap>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default SubComments;

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
