import React , {useState  } from 'react';
import allContentState from "./allContentState";

import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE , createEditorStateFromRaw,
  serialiseEditorStateToRaw} from 'draftail';
 

export function Editor({}) {
  const [editorState, setEditorState] = useState(initEditorState);

  const initEditorState = createEditorStateFromRaw(allContentState);

  return (
    <>
      <DraftailEditor
         rawContentState={allContentState}
        blockTypes={[
          { type: BLOCK_TYPE.HEADER_THREE },
          { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
        ]}
        inlineStyles={[{ type: INLINE_STYLE.BOLD }, { type: INLINE_STYLE.ITALIC }]}
      />
    </>
  );
}
