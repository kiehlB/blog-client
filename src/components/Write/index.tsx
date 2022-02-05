import { Spinner } from 'evergreen-ui';
import createColorBlockPlugin from './colorBlockPlugin';
import Button from '../Common/TailButton';
import { Pane, Badge, Text } from 'evergreen-ui';
import Link from 'next/link';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { RichUtils, getDefaultKeyBinding, DefaultDraftBlockRenderMap } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import hashtagStyles from './hashtagStyles.module.css';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import { BoldButton } from 'draft-js-buttons';
import linkStyles from './linkStyles.module.css';
import BlockStyling from './BlockStyling.module.css';
import ImageAdd from './ImageAdd';
import createStyles from 'draft-js-custom-styles';
import buttonStyle from './button.module.scss';
import classNames from 'classnames';
import useEditor from './hooks/useEditor';
import { useRouter } from 'next/router';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import Tags from '../Tags';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-nextjs-toast';
import media from '../../lib/styles/media';
import { PostInit } from '../../store/post';
import TagsForm from '../Tags/TagsForm';
import { checkEmpty } from '../../utils/isNull';
import Map from 'immutable';
import Immutable from 'immutable';
import Prism from 'Prismjs';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/plugins/unescaped-markup/prism-unescaped-markup.min.js';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const CodeBlock = props => {
  return (
    <pre>
      <code className="language-javascript">{props.children}</code>
    </pre>
  );
};

const ButtonStyles = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: rgb(134, 142, 150);
  cursor: pointer;
`;

const B = styled.div`
  margin-left: 0.5rem;
  display: flex;
  font-size: 1rem;
  font-weight: bold;
  color: rgb(134, 142, 150);
  cursor: pointer;
  align-items: center;
`;

const EditorMainTap = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  .my-little-app {
    padding: 1.1rem;
    width: 70vw;
    margin: 0 auto;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .home-button {
    position: absolute;
  }
  .square_btn {
    position: relative;
    display: inline-block;
    font-weight: bold;
    padding: 5px 11px 5px 15px;
    text-decoration: none;
    color: #67c5ff;
    transition: 0.4s;
    &::after {
      position: absolute;
      display: inline-block;
      content: '';
      width: 4px;
      height: 100%;
      top: 0;
      left: 100%;
      border-radius: 3px;
      background: #67c5ff;
    }
    &:hover:before,
    &:hover:after {
      -webkit-transform: rotate(10deg);
      -ms-transform: rotate(10deg);
      transform: rotate(10deg);
    }
    &::before {
      position: absolute;
      display: inline-block;
      content: '';
      width: 4px;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 3px;
      background: #67c5ff;
    }
  }
  .draft-editor-title {
    font-size: 14.5px;
    line-height: 20px;
    letter-spacing: 0.7px;
    font-family: Open Sans;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    position: inline;
    padding: 0.5rem;
    margin-left: 0.6rem;
  }
  .draft-editor-body {
    line-height: 1.6;
    min-height: 9rem;
    border-radius: 0 0 3px 3px;
    background-color: #fff;
    font-size: 17px;
    font-weight: 300;
    box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
    height: 120vh;
    width: 40vw;
    padding: 2rem;
    margin: 0 auto;
    ${media.custom(1200)} {
      width: 60vw;
    }
    ${media.custom(600)} {
      all: unset;
      line-height: 1.6;
      word-break: break-word;
    }
    .hashtag {
      color: #1ca782;
      font-family: cursive;
    }
  }
  .post-button {
    cursor: pointer;
    border-radius: 10px;
    font-size: 13px;
    float: right;
    display: inline;
    padding: 0.5em;
    color: #fff;
    border: none;
    background-color: #ff5370;
    margin: 0.4em;
  }
  .editor-style-button {
    display: felx;
    display: inline-block;
    text-decoration: none;
    background: #668ad8; /*ButtonColor*/
    color: #fff;
    border-bottom: solid 4px #627295;
    border-radius: 3px;
    justify-content: center;
    margin-left: 0.2rem;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .editor-style-wrapeer {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    justify-content: center;
  }
  .inline-style-options {
    margin: auto 0;
    width: 60%;
    display: flex;
    flex-wrap: wrap;
  }
  .thumbnail-wrapper {
    margin-top: 1.5rem;
  }
  .ImgAdd-button {
    width: 60%;
    margin: 0 auto;
    padding: 1rem;
    margin: 0 auto;
  }
`;

const TagBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;

  align-items: center;
`;

const Thumbnail = styled.div`
  margin: 0 auto;
  padding: 0.5rem;
  display: flex;
  align-items: center;
`;
const inlineStyleButtons = [
  {
    value: 'B',
    style: 'BOLD',
  },

  {
    value: 'I',
    style: 'ITALIC',
  },

  {
    value: 'Underline',
    style: 'UNDERLINE',
  },

  {
    value: 'Strikethrough',
    style: 'STRIKETHROUGH',
  },

  {
    value: 'Code',
    style: 'CODE',
  },
  {
    value: 'FANCYBLOCKQUOTE',
    style: 'FANCYBLOCKQUOTE',
  },
  {
    value: 'H1',
    style: 'H1',
  },
  {
    value: 'H2',
    style: 'H2',
  },
  {
    value: 'H3',
    style: 'H3',
  },
];

const myBlockStyleFn = contentBlock => {
  const type = contentBlock.getType();

  if (type === 'BLOCKQUOTE') {
    return `${BlockStyling.superFancyBlockquote}`;
  } else if (type == 'unstyled') {
    return <section />;
  } else if (type === 'header-one') {
    return `${BlockStyling.h1}`;
  } else if (type === 'header-two') {
    return `${BlockStyling.h2}`;
  } else if (type === 'header-three') {
    return `${BlockStyling.h3}`;
  } else if (type === 'bold') {
    return `${BlockStyling.b}`;
  } else if (type === 'b2') {
    return `${BlockStyling.b2}`;
  }
};
const blockRenderMap = Immutable.Map({
  'code-block': {
    element: 'div',
    wrapper: <CodeBlock />,
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const { customStyleFn } = createStyles(['font-size']);
const hashtagPlugin = createHashtagPlugin({ theme: hashtagStyles });
const linkPlugin = createLinkPlugin({
  theme: linkStyles,
  placeholder: 'http://…',
});
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator,
);

const imagePlugin = createImagePlugin({ decorator });

const colorBlockPlugin = createColorBlockPlugin({ decorator });

const plugins = [
  imagePlugin,
  hashtagPlugin,
  inlineToolbarPlugin,
  linkPlugin,
  blockDndPlugin,
  focusPlugin,
  resizeablePlugin,
];

function BlockWrapper({ children }) {
  return <div>{children}</div>;
}

export type EditorMainProps = {};

function EditorMain(props: EditorMainProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(PostInit());
      Prism.highlightAll();
    };
  }, []);
  const inputEl = useRef(null);
  const router = useRouter();
  const {
    handleSubmit,
    EditSubmit,
    inputs,
    editorState,
    setEditorState,
    titleOnChange,
    handleFileInputChange,
    previewSource,
    fileInputState,
    readyForFile,
    tag,
    setTag,
  } = useEditor();
  const buttonClass = classNames(`${buttonStyle.button} ${buttonStyle.shinydarken}`);

  const onChange = editorState => {
    setEditorState(editorState);
  };

  const toggleInlineStyle = event => {
    event.preventDefault();
    let style = event.currentTarget.getAttribute('data-style');

    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const renderInlineStyleButton = (value, style) => {
    return (
      <button
        type="button"
        key={style}
        data-style={style}
        onMouseDown={toggleInlineStyle}
        className="p-1.5 cursor-pointer hover:bg-neutral-100 transition-all">
        <ButtonStyles> {value}</ButtonStyles>
      </button>
    );
  };

  const toggleBlockType = blockType => {
    console.log(blockType);
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const onClickNotifyCheckString = e => {
    e.preventDefault();
    toast.notify(`제목을 입력해주세요`, {
      duration: 2,
      type: 'error',
    });
  };

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    } else {
      return 'not-handled';
    }
  };

  const handleReturn = e => {
    if (e.keyCode === 13) {
      setEditorState(RichUtils.insertSoftNewline(editorState));

      return 'handled';
    }
    return getDefaultKeyBinding(e);
  };

  const addTag = text => {
    const newTag = [...tag, { text }];
    setTag(newTag);
  };

  const deleteTag = index => {
    const newTag = [...tag];
    newTag.splice(index, 1);
    setTag(newTag);
  };

  const WaitingFotImg = readyForFile => {
    if (readyForFile == 0) {
      return (
        <>
          <div></div>
        </>
      );
    } else if (readyForFile == 1) {
      return (
        <>
          <Spinner size={16} />
        </>
      );
    } else if (readyForFile == 2) {
      return (
        <>
          <Pane flexBasis={120}>
            <Badge color="green">Success</Badge>
          </Pane>
        </>
      );
    }
  };
  const checkKeyDown = e => {
    if (e.code === 'Enter') e.preventDefault();
  };

  return (
    <>
      <form className="w-2/4  border-r-2 h-full mlg:w-full">
        <div className="h-4/6  p-9">
          <input
            className="text-4xl  font-bold focus:outline-none w-full "
            name="title"
            onChange={titleOnChange}
            value={inputs}
            placeholder="제목을 입력하세요"
            onKeyDown={e => checkKeyDown(e)}
          />

          <hr className="border-2 w-6/12 mt-3.5 " />
          <TagBlock>
            {tag.map((tags, index) => (
              <Tags tags={tags} key={index} deleteTag={deleteTag} index={index} />
            ))}
            <>
              <TagsForm addTag={addTag} />
            </>
          </TagBlock>
          <div className="mt-3.5 flex items-center flex-wrap">
            <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
            <ImageAdd
              /* @ts-ignore */
              editorState={editorState}
              onChange={onChange}
              modifier={imagePlugin.addImage}
            />
          </div>

          <B>
            <div style={{ marginRight: '.5rem' }}>Thumbnail</div>
            <label htmlFor="input-file">
              <svg width="1.5rem" height="1.5rem" fill="none" viewBox="0 0 107 85">
                <path
                  fill="#868E96"
                  d="M105.155 0H1.845A1.844 1.844 0 0 0 0 1.845v81.172c0 1.02.826 1.845 1.845 1.845h103.31A1.844 1.844 0 0 0 107 83.017V1.845C107 .825 106.174 0 105.155 0zm-1.845 81.172H3.69V3.69h99.62v77.482z"></path>
                <path
                  fill="#868E96"
                  d="M29.517 40.84c5.666 0 10.274-4.608 10.274-10.271 0-5.668-4.608-10.276-10.274-10.276-5.665 0-10.274 4.608-10.274 10.274 0 5.665 4.609 10.274 10.274 10.274zm0-16.857a6.593 6.593 0 0 1 6.584 6.584 6.593 6.593 0 0 1-6.584 6.584 6.591 6.591 0 0 1-6.584-6.582c0-3.629 2.954-6.586 6.584-6.586zM12.914 73.793a1.84 1.84 0 0 0 1.217-.46l30.095-26.495 19.005 19.004a1.843 1.843 0 0 0 2.609 0 1.843 1.843 0 0 0 0-2.609l-8.868-8.868 16.937-18.548 20.775 19.044a1.846 1.846 0 0 0 2.492-2.72L75.038 31.846a1.902 1.902 0 0 0-1.328-.483c-.489.022-.95.238-1.28.6L54.36 51.752l-8.75-8.75a1.847 1.847 0 0 0-2.523-.081l-31.394 27.64a1.845 1.845 0 0 0 1.22 3.231z"></path>
              </svg>
            </label>
            <input
              id="input-file"
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
              style={{ display: 'none' }}
            />
            <div style={{ marginLeft: '.5rem' }}>{WaitingFotImg(readyForFile)}</div>
          </B>
          <EW className="overflow-y-scroll mt-6">
            <Editor
              /* @ts-ignore */
              customStyleMap={styleMap}
              editorState={editorState}
              onChange={onChange}
              blockStyleFn={myBlockStyleFn}
              handleKeyCommand={handleKeyCommand}
              ref={inputEl}
              plugins={plugins}
              blockRenderMap={extendedBlockRenderMap}
              customStyleFn={customStyleFn}
            />
          </EW>

          <ButtonWrapper>
            <div style={{ marginRight: '1rem' }}>
              <Link href="/">
                <Button className="text-zinc-600 ">뒤로가기</Button>
              </Link>
            </div>
            <Button
              type="button"
              className="text-zinc-600 "
              onClick={e =>
                checkEmpty(inputs)
                  ? onClickNotifyCheckString(e)
                  : router.query.id === undefined
                  ? handleSubmit(e)
                  : EditSubmit(e)
              }>
              완료
            </Button>
          </ButtonWrapper>
          <pre>
            <code className="language-javascript">console.log('dd');</code>
          </pre>
        </div>
      </form>
    </>
  );
}

export default EditorMain;

const StyleButton = props => {
  const onToggle = e => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = 'RichEditor-styleButton';
  if (props.active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      <div className="flex p-1.5 cursor-pointer  ">
        {BLOCK_TYPES.map(type => (
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    </div>
  );
};

const styleMap = {
  BOLD: {
    color: '#1fb6ff ',
    fontWeight: 'bold',
  },
  ANYCUSTOMSTYLE: {
    color: '#00e400',
  },
  FANCYBLOCKQUOTE: {
    color: '#999',
    fontStyle: 'italic',
    fontFamily: `'Hoefler Text', Georgia, serif`,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  H1: {
    fontSize: '2rem',
    backgroundColor: '#fff',
  },
  H2: {
    fontSize: '1.5rem',
  },
  H3: {
    fontSize: '1.7rem',
  },
};

const BLOCK_TYPES = [
  { label: 'B', style: 'bold' },
  { label: 'BLOCKQUOTE', style: 'BLOCKQUOTE' },
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code', style: 'code-block' },
  { label: 'B2', style: 'b2' },
];

const EW = styled.div`
  height: calc(100% - 85px) !important;
  border-radius: 0 0 3px 3px;
  background-color: #fff;
  font-weight: 300;
  box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
  word-break: break-word;
  padding: 2rem;
  white-space: pre-line;
  line-break: strict;

  line-height: 75%;
`;

const ButtonWrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: flex-end;
`;
