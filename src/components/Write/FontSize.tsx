import React, { useState } from 'react';

import './EditorToolbar.module.css';

// don't forget to declare styles in props!
const EditorToolbar = ({ editorState, setEditorState, styles }) => {
  //declare state for conditional rendering of font size menu
  const [isShowingFontSizeMenu, setIsShowingFontSizeMenu] = useState(false);

  const setFontSize = (e, value) => {
    //Keep cursor focus inside Editor
    e.preventDefault();

    //remove current font size at selection
    const newEditorState = styles.fontSize.remove(editorState);

    //set editorState to display new font size
    setEditorState(styles.fontSize.add(newEditorState, value));

    //close dropdown menu
    setIsShowingFontSizeMenu(false);
  };

  //map array of integers to display options for dropdown
  const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 38, 46, 54, 62, 72];
  const fontSizeOptions = fontSizes.map(fontSize => (
    <div
      key={`font-size-${fontSize}`}
      className="font-size-option"
      //declare event for setting font size
      onClick={e => setFontSize(e, `${fontSize}px`)}>
      {fontSize}
    </div>
  ));

  return (
    <div>
      <div className="font-size-dropdown">
        <button
          //show dropdown menu when button is pressed,
          //keeping cursor focused inside Editor
          onClick={e => {
            e.preventDefault();
            setIsShowingFontSizeMenu(!isShowingFontSizeMenu);
          }}>
          Font Size
        </button>
        {/*open or close menu if the button is pressed.*/}
        {isShowingFontSizeMenu ? (
          <div className="font-size-menu">{fontSizeOptions}</div>
        ) : null}
      </div>
    </div>
  );
};

export default EditorToolbar;
