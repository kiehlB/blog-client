import { useMutation, useQuery } from '@apollo/client';
import {
  Create_Post,
  GET_Posts,
  Get_TopPost,
  UPLOAD_IMAGE_TO_CLOUDINARY,
  Edit_Post,
} from '../../../lib/graphql/posts';
import { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import { RootState } from '../../../store/rootReducer';

export default function useEditor() {
  const [editPost, { error }] = useMutation(Edit_Post);
  const {
    loading: loadingGetPost,
    error: errorGetPos,
    data: dataGetPost,
  } = useQuery(GET_Posts);
  const router = useRouter();

  const getPosts = useSelector((state: RootState) => state.post.post);
  const initialData = {
    blocks: [
      {
        key: '16d0k',
        text: 'You can edit this text.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [{ offset: 0, length: 23, style: 'unstyled' }],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  };

  const [createPost] = useMutation(Create_Post);
  const [uploadThumbnail] = useMutation(UPLOAD_IMAGE_TO_CLOUDINARY);
  const [inputs, setInputs] = useState(
    (getPosts as any).title ? (getPosts as any).title : '',
  );
  const [fileInputState, setFileInputState] = useState('');
  const [readyForFile, setreadyForFile] = useState(0);

  const [previewSource, setPreviewSource] = useState('');
  const [tag, setTag] = useState([]);
  const [url, setUrl] = useState('');

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw(
        (getPosts as any).body ? JSON.parse((getPosts as any).body) : initialData,
      ),
    ),
  );

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    setreadyForFile(1);
    previewFile(file);
    setFileInputState(e.target.value);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      await uploadThumbnail({
        variables: {
          body: reader.result,
        },
        update: (_proxy, { data: newData }) => {
          setreadyForFile(2);
          setUrl(newData.uploadImage.url);
        },
      });
    };
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as any);
    };
  };

  const titleOnChange = e => {
    setInputs(e.target.value);
  };

  const stringData = tag.reduce((result, item) => {
    return `${result}${item.text} `;
  }, '');

  const EditSubmit = async e => {
    e.preventDefault();
    editPost({
      variables: {
        post_id: router.query.id.toString(),
        title: inputs,
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      },
      update: (proxy, { data: editPost }) => {
        const data = proxy.readQuery({
          query: GET_Posts,
        });

        const findData = (data as any).posts.find(
          el => el.id == router.query.id.toString(),
        );
        proxy.writeQuery({
          query: GET_Posts,
          data: {
            ...(data as any),
            posts: [findData == editPost.editPost],
          },
        });
      },
    });
    router.push(`/post/${router.query.id.toString()}`);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    createPost({
      variables: {
        title: inputs,
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        thumbnail: url,
        tags: stringData,
      },

      update: async (proxy, { data: createPost }) => {
        const data = proxy.readQuery({
          query: GET_Posts,
        });

        // proxy.writeQuery({
        //   query: GET_Posts,
        //   data: {
        //     posts:  data?.posts.filter(p => p.id !== removeId),
        //   },
        // });
      },
    });

    window.location.replace('/');
    // router.push('/');
  };

  return {
    handleSubmit,
    EditSubmit,
    inputs,
    editorState,
    setEditorState,
    titleOnChange,
    handleFileInputChange,
    previewSource,
    fileInputState,
    tag,
    setTag,
    readyForFile,
  };
}
