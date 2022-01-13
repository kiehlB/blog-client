import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Edit_Comment, Get_Comment } from '../../../lib/graphql/posts';


export default function useEditComment() {
    const [editComment, { error }] = useMutation(Edit_Comment);
    const EditCommentSubmit = async (e, commentId, text) => {
        e.preventDefault();

        editComment({
            variables: {
                id: commentId,
                text: text,
            },

            update: (proxy, { data: editComment }) => {
                const data = proxy.readQuery({
                    query: Get_Comment,
                });

                const findData = (data as any).comment.find(el => el.id == commentId);
                const findIndex = (data as any).comment.indexOf(findData);

                const findSubData = (data as any).comment[findIndex].replies.find(
                    el => el.id == commentId,
                );

                proxy.writeQuery({
                    query: Get_Comment,
                    data: {
                        ...(data as any),
                        comment: [findData == editComment.editComment],
                    },
                });
            },
        });
    };

    return { EditCommentSubmit };
}