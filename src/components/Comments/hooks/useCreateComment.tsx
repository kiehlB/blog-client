import { useMutation } from '@apollo/client';

import { useState } from 'react';
import { Create_Comment, Get_Comment } from '../../../lib/graphql/posts';

export default function useCreateComment() {
  const [getText, setText] = useState('');
  const [getSubText, setSubText] = useState('');
  const [isOpen, setIsopen] = useState('');

  const textOnChange = e => {
    setText(e.target.value);
  };

  const subTextOnChange = e => {
    setSubText(e.target.value);
  };

  const [createComment] = useMutation(Create_Comment, {
    onCompleted({ createComment }) {},
  });

  const handleSubmit = async (e, findId, Text) => {
    e.preventDefault();

    createComment({
      variables: {
        post_id: findId,
        text: Text,
      },
      update: (proxy, { data: createComment }) => {
        const data = proxy.readQuery({
          query: Get_Comment,
        });

        proxy.writeQuery({
          query: Get_Comment,
          data: {
            ...(data as any),
            comment: [createComment.createComment, ...(data as any).comment],
          },
        });
      },
    });
  };

  const subHandleSubmit = async (e, findId, subText) => {
    e.preventDefault();

    createComment({
      variables: {
        post_id: findId,
        text: subText,
        comment_id: isOpen,
      },

      update: async (proxy, { data: createComment }) => {
        const data = proxy.readQuery({
          query: Get_Comment,
        });

        const findData = (data as any).comment.filter(el => el.id == isOpen);

        proxy.writeQuery({
          query: Get_Comment,
          data: {
            ...(data as any),
            comment: [createComment.createComment, ...findData[0].replies],
          },
        });
      },
    });
  };

  return {
    textOnChange,
    subTextOnChange,
    handleSubmit,
    subHandleSubmit,
    getText,
    getSubText,
    isOpen,
    setIsopen,
  };
}
