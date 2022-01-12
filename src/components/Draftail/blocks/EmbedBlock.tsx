import React from "react";
import MediaBlock from "./MediaBlock";

/**
 * Editor block to display media and edit content.
 */
const EmbedBlock = props => {
  const { blockProps } = props;
  const { entity, onEditEntity, onRemoveEntity } = blockProps;
  const { url, title, thumbnail } = entity.getData();
  const isLoading = !url && !title && !thumbnail;

  return (
    <MediaBlock {...props} src={thumbnail} label={title} isLoading={isLoading}>
      <a
        className="EmbedBlock__link"
        href={url}
        title={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>

      <button type="button" className="Tooltip__button" onClick={onEditEntity}>
        Edit
      </button>

      <button
        type="button"
        className="Tooltip__button"
        onClick={onRemoveEntity}
      >
        Remove
      </button>
    </MediaBlock>
  );
};

export default EmbedBlock;
