import React, { useState } from 'react';
import allContentState from './allContentState';
import { INLINE_CONTROL, BLOCK_CONTROL, ENTITY_CONTROL } from './ui';

import {
  DraftailEditor,
  BLOCK_TYPE,
  INLINE_STYLE,
  createEditorStateFromRaw,
} from 'draftail';

import linkifyPlugin from './plugins/linkifyPlugin';
import autoEmbedPlugin from './plugins/autoEmbedPlugin';

import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';

import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';

import createEmojiPlugin from 'draft-js-emoji-plugin';
// import createResizeablePlugin from 'draft-js-resizeable-plugin';
// import createFocusPlugin from 'draft-js-focus-plugin';
import createStickerPlugin from 'draft-js-sticker-plugin';

import ReadingTime from './components/ReadingTime';

import { mentions } from './plugins/mentions';

// const focusPlugin = createFocusPlugin();
// const resizeablePlugin = createResizeablePlugin();

import { stickers } from './plugins/stickers';

import { getDefaultKeyBinding, serialiseEditorStateToRaw } from 'draft-js';

const stickerPlugin = createStickerPlugin({
  stickers: stickers,
  selectButtonContent: <button>Stickers</button>,
});
const emojiPlugin = createEmojiPlugin();
const linkify = linkifyPlugin();
const autoEmbed = autoEmbedPlugin();
const hashtagPlugin = createHashtagPlugin();
const mentionPlugin = createMentionPlugin({
  mentions,
  entityMutability: 'IMMUTABLE',
  mentionComponent: mentionProps => (
    <span
      className={mentionProps.className}
      // eslint-disable-next-line no-alert
      onClick={() => alert('Clicked on the Mention!')}>
      {mentionProps.children}
    </span>
  ),
  // theme: mentionsStyles,
  // positionSuggestions,
  mentionPrefix: '@',
  supportWhitespace: false,
});

// const initial = JSON.parse(sessionStorage.getItem("draftail:content"))
const initial = null;

const onSave = content => {
  // sessionStorage.setItem("draftail:content", JSON.stringify(content))
};

export const Editor = () => {
  const initEditorState = createEditorStateFromRaw(allContentState);
  const [number, setNumber] = useState(0);
  const [user, setUser] = useState();
  const [editorState, setEditorState] = useState(initEditorState);
  const [suggestionsState, setSuggestionsState] = useState(mentions);

  const onChange = editorState => {
    setEditorState(editorState);
  };

  const myKeyBindingFn = e => {
    // if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
    //   return 'myeditor-save';
    // }
    return getDefaultKeyBinding(e);
  };

  const onSearchChange = ({ value }) => {
    setSuggestionsState(defaultSuggestionsFilter(value, mentions));
  };

  const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
  const { MentionSuggestions } = mentionPlugin;
  const { StickerSelect } = stickerPlugin;
  // const decorator = composeDecorators(
  //   resizeablePlugin.decorator,
  //   focusPlugin.decorator,
  // );

  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
      <div style={{ flex: '1 0 50%' }}>
        <DraftailEditor
          rawContentState={allContentState}
          // onSave={onSave}
          editorState={editorState}
          onChange={onChange}
          stripPastedStyles={false}
          enableHorizontalRule={{
            description: 'Horizontal rule',
          }}
          enableLineBreak={{
            description: 'Soft line break',
          }}
          showUndoControl={{
            description: 'Undo last change',
          }}
          showRedoControl={{
            description: 'Redo last change',
          }}
          maxListNesting={6}
          blockTypes={Object.values(BLOCK_CONTROL)}
          inlineStyles={Object.values(INLINE_CONTROL)}
          entityTypes={[
            ENTITY_CONTROL.IMAGE,
            ENTITY_CONTROL.LINK,
            ENTITY_CONTROL.EMBED,
            ENTITY_CONTROL.DOCUMENT,
          ]}
          plugins={[
            autoEmbed,
            linkify,
            hashtagPlugin,
            mentionPlugin,
            emojiPlugin,
            stickerPlugin,
            // focusPlugin,
            // resizeablePlugin
          ]}
          controls={[ReadingTime]}
          keyBindingFn={myKeyBindingFn}
        />
        <MentionSuggestions
          onSearchChange={onSearchChange}
          suggestions={suggestionsState}
        />
        <EmojiSuggestions />
      </div>
      <div style={{ marginBottom: '2em' }}>
        <EmojiSelect />
      </div>

      <div
        style={{
          flex: '0 0 50%',
          width: '50%',
          textAlign: 'left',
          wordBreak: 'break-all',
        }}></div>
    </div>
  );
};
