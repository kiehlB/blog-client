import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import useEditor from './hooks/useEditor';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
export type WriteProps = {};

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

function Write({}: WriteProps) {
  const { CreatePost, value, quil, setValue, inputs, titleOnChange } = useEditor();

  const handleUploadImage = () => {
    console.log(quil.current.getEditor().getSelection());
  };

  return (
    <WriteBlock>
      <form>
        <input
          name="title"
          onChange={titleOnChange}
          value={inputs}
          className="draft-editor-title"
          placeholder="Title"
        />
        <ReactQuill
          ref={quil}
          modules={modules}
          formats={formats}
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </form>
      <button onClick={e => CreatePost(e)}>완료</button>
    </WriteBlock>
  );
}

const WriteBlock = styled.div``;

export default Write;
