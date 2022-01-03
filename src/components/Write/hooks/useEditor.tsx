import { useMutation, useQuery } from '@apollo/client';
import {
  Create_Post,
  GET_Posts,
  Get_TopPost,
  UPLOAD_IMAGE_TO_CLOUDINARY,
  Edit_Post,
} from '../../../lib/graphql/posts';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function useEditor() {
  const [inputs, setInputs] = useState('');
  const [value, setValue] = useState('');
  const quil = useRef(null);

  const [editPost, { error }] = useMutation(Edit_Post);
  const {
    loading: loadingGetPost,
    error: errorGetPos,
    data: dataGetPost,
  } = useQuery(GET_Posts);
  const router = useRouter();

  const titleOnChange = e => {
    setInputs(e.target.value);
  };

  const [createPost] = useMutation(Create_Post);

  const CreatePost = async e => {
    e.preventDefault();

    createPost({
      variables: {
        title: inputs,
        body: value,
      },
    });

    // router.push('/');
  };

  return {
    CreatePost,
    value,
    quil,
    setValue,
    inputs,
    setInputs,
    titleOnChange,
  };
}
