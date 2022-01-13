import { useMutation } from '@apollo/client';

import { useState } from 'react';
import { Get_Comment, Remove_Comment } from '../../../lib/graphql/posts';

export default function useDeleteComment() {
    const [deleteComment, { error }] = useMutation(Remove_Comment);
    const DeleteCommentSubmit = async (e, commentId) => {
        e.preventDefault();

        deleteComment({
            variables: {
                id: commentId,
            },
            update: (proxy, { data: deleteComment }) => {
                const data = proxy.readQuery({
                    query: Get_Comment,
                });

                const findData = (data as any).comment.find(el => el.id == commentId);
                const findIndex = (data as any).comment.indexOf(findData);

                proxy.writeQuery({
                    query: Get_Comment,
                    data: {
                        ...(data as any),
                        comment: [...(data as any).comment.filter(el => el.id !== commentId)],
                    },
                });
            },
        });
    };

    return { DeleteCommentSubmit };
}