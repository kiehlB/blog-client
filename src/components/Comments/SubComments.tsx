import React, { useState } from 'react';

import styled from 'styled-components';
import { MeQuery } from '../../types/apolloComponent';
import { checkEmpty } from '../../utils/isNull';

const SubCommentsTap = styled.div`
  width: 90%;
  font-size: 1rem;
  color: rgb(33, 37, 41);
  line-height: 1.75;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid rgb(33, 37, 41);
  border-color: rgb(233, 236, 239);
  border-image: initial;
  border-radius: 4px;
  .sub-color {
    color: rgb(134, 142, 150);
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
    };

    return (
        <>
            <div>
                {props.ele.reply && props.el.id == props.ele.reply ? (
                    <div className="subcomments-wrapper">
                        <SubCommentsTap>
                            <div> User {props.ele.user?.username} </div>
                            {editSubComment ? (
                                <>
                                    <form
                                        onSubmit={e => {
                                            checkEmpty(subEditText)
                                                ? props.onClickNotifyCheckString(e)
                                                : props.EditCommentSubmit(e, props.ele.id, subEditText);

                                            checkEmpty(subEditText) ? e.preventDefault() : fixSubComment();
                                        }}>
                                        <input
                                            name="text"
                                            value={subEditText}
                                            onChange={editSubCommentInput}
                                            type="text"
                                            placeholder="댓글을 입력하세요"
                                        />
                                    </form>
                                    <div className="comments-edit-wrapper">
                                        <div
                                            onClick={e => {
                                                checkEmpty(subEditText)
                                                    ? props.onClickNotifyCheckString(e)
                                                    : props.EditCommentSubmit(e, props.ele.id, subEditText);

                                                checkEmpty(subEditText) ? e.preventDefault() : fixSubComment();
                                            }}
                                            className="sub-color">
                                            수정
                                        </div>
                                        <div className="sub-color" onClick={fixSubComment}>
                                            취소
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {props.ele.text}

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
                                </>
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