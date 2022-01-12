import React from 'react';

const ColorBlock = React.forwardRef(
  (
    {
      /* @ts-ignore */
      block, // eslint-disable-line no-unused-vars
      /* @ts-ignore */
      blockProps, // eslint-disable-line no-unused-vars
      /* @ts-ignore */
      customStyleMap, // eslint-disable-line no-unused-vars
      /* @ts-ignore */
      customStyleFn, // eslint-disable-line no-unused-vars
      /* @ts-ignore */
      decorator, // eslint-disable-line no-unused-vars
      /* @ts-ignore */
      forceSelection, // eslint-disable-line no-unused-vars
      /* @ts-ignore */
      offsetKey, // eslint-disable-line no-unused-vars
      /* @ts-ignore */
      selection, // eslint-disable-line no-unused-vars
      /* @ts-ignore */
      tree, // eslint-disable-line no-unused-vars
      /* @ts-ignore */
      contentState, // eslint-disable-line no-unused-vars
      /* @ts-ignore */
      blockStyleFn, // eslint-disable-line no-unused-vars
      /* @ts-ignore */
      preventScroll, // eslint-disable-line no-unused-vars
      /* @ts-ignore */
      style,
      ...elementProps
    },
    ref,
  ) => (
    <div
      /* @ts-ignore */
      ref={ref}
      {...elementProps}
      style={{ width: 200, height: 80, backgroundColor: '#9bc0c7', ...style }}
    />
  ),
);

const createColorBlockPlugin = (config = {}) => {
  /* @ts-ignore */
  const component = config.decorator ? config.decorator(ColorBlock) : ColorBlock;
  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        if (type === 'colorBlock') {
          return {
            component,
            editable: false,
          };
        }
      }
      return null;
    },
  };
};
ColorBlock.displayName = 'ColorBlock';
export default createColorBlockPlugin;
