// @flow
import React from "react";
import readingTime from "reading-time";

/**
 * A basic control showing the reading time / content length for the editor’s content.
 */
const ReadingTime = ({ getEditorState }) => {
  const editorState = getEditorState();
  const content = editorState.getCurrentContent();
  const text = content.getPlainText();
  const stats = readingTime(text);
  return (
    <button
      name="READING_TIME"
      onClick={() => {
        // eslint-disable-next-line no-alert
        window.alert(`${text.length} characters, ${stats.words} words`);
      }}
    >
      `readingTime: {stats.text} ({text.length} chars, {stats.words} words)`
    </button>
  );
};

export default ReadingTime;
